/**
 * Google Apps Script Web App — Đồng bộ tự động 2 chiều + Chống Spam cho Website Tây Du VNG
 *
 * BẢO MẬT & CHỐNG SPAM:
 * - CHỈ đọc các sheet công khai (Theo dõi ev, HOAN TỤ KIM TIÊU), KHÔNG bao giờ đọc sheet cá nhân.
 * - Cache doGet 60 giây (CacheService) -> nhiều người mở web cùng lúc không làm quá tải Sheet.
 * - Chống brute-force mã PIN (sai 5 lần -> khóa ghi 10 phút).
 * - Cooldown 10 giây giữa các lần ghi (doPost).
 * - Validate định dạng ngày YYYY-MM-DD, end >= start, khoảng thời gian <= 90 ngày, và chặn ghi trùng ngày.
 */

const ADMIN_PIN = '123456'; // <-- ĐỔI THÀNH MÃ PIN BÍ MẬT CỦA BẠN
const GET_CACHE_SECONDS = 300; // Cache 5 phút cho các đợt đồng bộ tự động mỗi 2h
const POST_COOLDOWN_SECONDS = 10;
const MAX_PIN_FAILS = 5;
const PIN_LOCK_SECONDS = 600; // 10 phút

function doGet(e) {
  try {
    const cache = CacheService.getScriptCache();
    const params = (e && e.parameter) || {};
    const isForce = String(params.force || '') === '1';

    if (isForce) {
      if (cache.get('tdvng_pin_locked')) {
        return jsonResponse({
          ok: false,
          error: 'Quá nhiều lần nhập sai mã PIN. Tạm khóa đồng bộ thủ công trong 10 phút.',
        });
      }
      if (ADMIN_PIN && String(params.pin || '').trim() !== ADMIN_PIN) {
        const fails = Number(cache.get('tdvng_pin_fails') || 0) + 1;
        cache.put('tdvng_pin_fails', String(fails), PIN_LOCK_SECONDS);
        if (fails >= MAX_PIN_FAILS) {
          cache.put('tdvng_pin_locked', '1', PIN_LOCK_SECONDS);
        }
        return jsonResponse({
          ok: false,
          error: 'Sai mã PIN! (' + fails + '/' + MAX_PIN_FAILS + ')',
        });
      }
      cache.remove('tdvng_pin_fails');
      cache.remove('tdvng_public_payload_v1');
    } else {
      const cached = cache.get('tdvng_public_payload_v1');
      if (cached) {
        return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
      }
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const payload = {
      ok: true,
      updatedAt: new Date().toISOString(),
      events: readTrackedEvents(ss),
    };
    const jsonStr = JSON.stringify(payload);
    cache.put('tdvng_public_payload_v1', jsonStr, GET_CACHE_SECONDS);
    return ContentService.createTextOutput(jsonStr).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    const cache = CacheService.getScriptCache();

    // 1. Kiểm tra khóa tạm do nhập sai PIN nhiều lần
    if (cache.get('tdvng_pin_locked')) {
      return jsonResponse({
        ok: false,
        error: 'Quá nhiều lần nhập sai mã PIN. Tạm khóa ghi trong 10 phút.',
      });
    }

    // 2. Cooldown chống spam ghi liên tục
    if (cache.get('tdvng_post_cooldown')) {
      return jsonResponse({
        ok: false,
        error: 'Hệ thống đang xử lý, vui lòng đợi 10 giây giữa các lần ghi.',
      });
    }

    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // 3. Kiểm tra mã PIN Admin
    if (ADMIN_PIN && String(body.pin || '').trim() !== ADMIN_PIN) {
      const fails = Number(cache.get('tdvng_pin_fails') || 0) + 1;
      cache.put('tdvng_pin_fails', String(fails), PIN_LOCK_SECONDS);
      if (fails >= MAX_PIN_FAILS) {
        cache.put('tdvng_pin_locked', '1', PIN_LOCK_SECONDS);
      }
      return jsonResponse({
        ok: false,
        error: 'Sai mã PIN quản trị! (' + fails + '/' + MAX_PIN_FAILS + ')',
      });
    }
    cache.remove('tdvng_pin_fails');

    // 4. Validate dữ liệu đầu vào
    if (body.action === 'add_event_round') {
      const name = String(body.name || '').replace(/\s+/g, ' ').trim();
      const start = String(body.start || '').trim();
      const end = String(body.end || start).trim();
      const isoRe = /^\d{4}-\d{2}-\d{2}$/;

      if (name.length < 2 || name.length > 80) {
        return jsonResponse({ ok: false, error: 'Tên sự kiện phải từ 2 đến 80 ký tự.' });
      }
      if (!isoRe.test(start) || !isoRe.test(end)) {
        return jsonResponse({ ok: false, error: 'Ngày không hợp lệ (định dạng YYYY-MM-DD).' });
      }
      if (end < start) {
        return jsonResponse({ ok: false, error: 'Ngày kết thúc phải >= ngày bắt đầu.' });
      }
      const diffDays = (new Date(end).getTime() - new Date(start).getTime()) / 86400000;
      if (diffDays > 90) {
        return jsonResponse({ ok: false, error: 'Thời gian sự kiện không được vượt quá 90 ngày.' });
      }

      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const result = appendEventRound(ss, name, start, end);
      if (result.ok) {
        cache.put('tdvng_post_cooldown', '1', POST_COOLDOWN_SECONDS);
        cache.remove('tdvng_public_payload_v1'); // Xóa cache để web thấy ngay dữ liệu mới
      }
      return jsonResponse(result);
    }

    return jsonResponse({ ok: false, error: 'Action không hợp lệ.' });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function formatDateISO(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  const s = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  return '';
}

function readTrackedEvents(ss) {
  const sheet = ss.getSheetByName('Theo dõi ev');
  if (!sheet) return [];
  const lastRow = Math.max(sheet.getLastRow(), 50);
  const values = sheet.getRange(22, 1, lastRow - 21, 28).getValues();
  const groups = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
  ];
  const map = {};

  for (const [cName, cStart, cEnd, cType] of groups) {
    let current = '';
    for (let r = 0; r < values.length; r++) {
      const a = values[r][cName];
      const b = values[r][cStart];
      const c = values[r][cEnd];
      const t = values[r][cType];
      const aStr = a !== null && a !== undefined ? String(a).replace(/\s+/g, ' ').trim() : '';
      const tStr = t !== null && t !== undefined ? String(t).replace(/\s+/g, ' ').trim() : '';

      if (aStr && aStr !== 'STT' && isNaN(Number(aStr))) {
        current = aStr;
        if (!map[current]) map[current] = { type: tStr, rounds: [] };
        else if (tStr) map[current].type = tStr;
      } else if (current && b) {
        const start = formatDateISO(b);
        if (start) {
          const end = formatDateISO(c) || start;
          const dup = map[current].rounds.some((x) => x.start === start && x.end === end);
          if (!dup) {
            map[current].rounds.push({ round: map[current].rounds.length + 1, start, end });
          }
        }
      }
    }
  }

  return Object.keys(map).map((name) => ({
    name,
    type: map[name].type || '',
    rounds: map[name].rounds
      .sort((a, b) => a.start.localeCompare(b.start))
      .map((x, idx) => ({ round: idx + 1, start: x.start, end: x.end })),
  }));
}

function appendEventRound(ss, eventName, startISO, endISO) {
  const sheet = ss.getSheetByName('Theo dõi ev');
  if (!sheet) return { ok: false, error: 'Không tìm thấy sheet Theo dõi ev' };

  const target = eventName.toLowerCase();
  const lastRow = Math.max(sheet.getLastRow(), 55);
  const values = sheet.getRange(22, 1, lastRow - 21, 27).getValues();
  const groups = [0, 4, 8, 12, 16, 20, 24];

  for (const colIdx of groups) {
    for (let r = 0; r < values.length; r++) {
      const cell = String(values[r][colIdx] || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (cell === target) {
        // Kiểm tra trùng ngày start
        for (let k = r + 2; k < r + 7 && k < values.length; k++) {
          if (formatDateISO(values[k][colIdx + 1]) === startISO) {
            return { ok: false, error: 'Đợt ngày ' + startISO + ' của "' + eventName + '" đã tồn tại!' };
          }
        }
        // Ghi vào dòng trống đầu tiên
        for (let k = r + 2; k < r + 7 && k < values.length; k++) {
          if (!values[k][colIdx + 1]) {
            const sheetRow = 22 + k;
            const sheetCol = colIdx + 1;
            const [sy, sm, sd] = startISO.split('-').map(Number);
            const [ey, em, ed] = (endISO || startISO).split('-').map(Number);
            sheet.getRange(sheetRow, sheetCol + 1).setValue(new Date(sy, sm - 1, sd));
            sheet.getRange(sheetRow, sheetCol + 2).setValue(new Date(ey, em - 1, ed));
            return { ok: true, message: 'Đã ghi đợt mới của "' + eventName + '" vào Google Sheet!' };
          }
        }
        return { ok: false, error: 'Bảng của "' + eventName + '" đã đầy hàng, hãy thêm dòng trên Sheet.' };
      }
    }
  }
  return { ok: false, error: 'Không tìm thấy sự kiện "' + eventName + '" trong sheet Theo dõi ev.' };
}
