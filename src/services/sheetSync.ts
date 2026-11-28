import {
  EVENT_HISTORY,
  HOAN_TU_KIM_TIEU_DATA,
  type HoanTuKimTieuConfig,
  type TrackedEvent,
} from '../data/gameData';

export const DEFAULT_SHEET_API_URL =
  'https://script.google.com/macros/s/AKfycbznT67SWIoWu_9tkEz2t-SLCq95Xy_Rm15Vl77jFoMWLRmP8hUBuAsQB8JXzXsGJnvnBw/exec';

export interface SyncedPayload {
  updatedAt: string;
  events?: TrackedEvent[];
  hoanTuKimTieu?: HoanTuKimTieuConfig;
}

const URL_KEY = 'tdvng_sheet_api_url';
const PIN_KEY = 'tdvng_sheet_admin_pin';
const CACHE_KEY = 'tdvng_sheet_sync_cache_v1';
const LAST_SYNC_TS_KEY = 'tdvng_last_manual_sync_ts';
const LAST_POST_TS_KEY = 'tdvng_last_post_ts';

export const SYNC_COOLDOWN_MS = 30_000; // 30s between manual sync clicks
export const POST_COOLDOWN_MS = 15_000; // 15s between write requests

const UTC7_OFFSET_MS = 7 * 60 * 60 * 1000;
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

/**
 * Returns the latest & next scheduled 4-hour sync slot (aligned to 04:00 UTC+7:
 * 04:00, 08:00, 12:00, 16:00, 20:00, 00:00 UTC+7).
 */
export function getScheduledSyncSlots(nowMs = Date.now()) {
  const vnMs = nowMs + UTC7_OFFSET_MS;
  const currentSlotVnMs = Math.floor(vnMs / FOUR_HOURS_MS) * FOUR_HOURS_MS;
  const currentSlotUtcMs = currentSlotVnMs - UTC7_OFFSET_MS;
  const nextSlotUtcMs = currentSlotUtcMs + FOUR_HOURS_MS;

  const nextVnDate = new Date(nextSlotUtcMs + UTC7_OFFSET_MS);
  const hh = String(nextVnDate.getUTCHours()).padStart(2, '0');
  const mm = String(nextVnDate.getUTCMinutes()).padStart(2, '0');

  return {
    currentSlotUtcMs,
    nextSlotUtcMs,
    msUntilNextSlot: Math.max(1000, nextSlotUtcMs - nowMs),
    nextSlotLabel: `${hh}:${mm}`,
  };
}

export function isSlotSyncDue(lastSyncedAt?: string | null, nowMs = Date.now()): boolean {
  const { currentSlotUtcMs } = getScheduledSyncSlots(nowMs);
  if (!lastSyncedAt) return true;
  const lastMs = Date.parse(lastSyncedAt);
  if (!Number.isFinite(lastMs)) return true;
  return lastMs < currentSlotUtcMs;
}

export function getConfiguredApiUrl(): string {
  const envUrl = (import.meta.env.VITE_GOOGLE_SHEET_API_URL as string | undefined)?.trim();
  if (envUrl) return envUrl;
  try {
    const custom = (localStorage.getItem(URL_KEY) || '').trim();
    if (custom) return custom;
  } catch {
    // ignore
  }
  return DEFAULT_SHEET_API_URL;
}

export function saveApiUrl(url: string) {
  try {
    const clean = url.trim();
    if (clean && clean !== DEFAULT_SHEET_API_URL) localStorage.setItem(URL_KEY, clean);
    else localStorage.removeItem(URL_KEY);
  } catch {
    // ignore
  }
}

export function getAdminPin(): string {
  try {
    return localStorage.getItem(PIN_KEY) || '';
  } catch {
    return '';
  }
}

export function saveAdminPin(pin: string) {
  try {
    if (pin.trim()) localStorage.setItem(PIN_KEY, pin.trim());
    else localStorage.removeItem(PIN_KEY);
  } catch {
    // ignore
  }
}

function normalizeHoanTu(raw?: Partial<HoanTuKimTieuConfig> | null): HoanTuKimTieuConfig {
  if (!raw) return HOAN_TU_KIM_TIEU_DATA;
  return {
    anhDang: { ...HOAN_TU_KIM_TIEU_DATA.anhDang, ...(raw.anhDang || {}) },
    quaKimTieu: { ...HOAN_TU_KIM_TIEU_DATA.quaKimTieu, ...(raw.quaKimTieu || {}) },
    tamVi: { ...HOAN_TU_KIM_TIEU_DATA.tamVi, ...(raw.tamVi || {}) },
    baoThiPacks:
      Array.isArray(raw.baoThiPacks) && raw.baoThiPacks.length > 0
        ? raw.baoThiPacks
        : HOAN_TU_KIM_TIEU_DATA.baoThiPacks,
  };
}

export function loadCachedSync(): SyncedPayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SyncedPayload;
    return {
      ...parsed,
      hoanTuKimTieu: normalizeHoanTu(parsed.hoanTuKimTieu),
    };
  } catch {
    return null;
  }
}

export function getSyncCooldownRemaining(): number {
  try {
    const last = Number(localStorage.getItem(LAST_SYNC_TS_KEY) || 0);
    return Math.max(0, SYNC_COOLDOWN_MS - (Date.now() - last));
  } catch {
    return 0;
  }
}

export function getPostCooldownRemaining(): number {
  try {
    const last = Number(localStorage.getItem(LAST_POST_TS_KEY) || 0);
    return Math.max(0, POST_COOLDOWN_MS - (Date.now() - last));
  } catch {
    return 0;
  }
}

export function validateEventRoundInput(params: {
  name: string;
  start: string;
  end: string;
  existingEvents?: TrackedEvent[];
}): string | null {
  const name = params.name.trim();
  if (name.length < 2 || name.length > 80) {
    return 'Tên sự kiện phải từ 2 đến 80 ký tự.';
  }
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRe.test(params.start)) {
    return 'Ngày bắt đầu không hợp lệ (định dạng YYYY-MM-DD).';
  }
  const end = params.end || params.start;
  if (!isoRe.test(end)) {
    return 'Ngày kết thúc không hợp lệ (định dạng YYYY-MM-DD).';
  }
  if (end < params.start) {
    return 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.';
  }
  const startMs = Date.parse(params.start);
  const endMs = Date.parse(end);
  const diffDays = (endMs - startMs) / 86400000;
  if (diffDays > 90) {
    return 'Khoảng thời gian sự kiện không được vượt quá 90 ngày.';
  }
  if (params.existingEvents) {
    const matched = params.existingEvents.find(
      (ev) => ev.name.trim().toLowerCase() === name.toLowerCase()
    );
    if (matched?.rounds.some((r) => r.start === params.start)) {
      return `Đợt bắt đầu ngày ${params.start} của "${name}" đã tồn tại.`;
    }
  }
  return null;
}

export async function fetchSheetSync(
  customUrl?: string,
  options?: { manual?: boolean; pin?: string }
): Promise<SyncedPayload> {
  const url = (customUrl ?? getConfiguredApiUrl()).trim();
  if (!url) {
    throw new Error('Chưa cấu hình nguồn đồng bộ dữ liệu.');
  }

  let query = `action=all&t=${Date.now()}`;
  if (options?.manual) {
    const pin = (options.pin || '').trim();
    if (!pin) {
      throw new Error('Vui lòng nhập mã PIN để đồng bộ.');
    }
    const rem = getSyncCooldownRemaining();
    if (rem > 0) {
      throw new Error(`Vui lòng đợi ${Math.ceil(rem / 1000)} giây trước khi đồng bộ lại.`);
    }
    query += `&force=1&pin=${encodeURIComponent(pin)}`;
  }

  const sep = url.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${sep}${query}`, {
    method: 'GET',
    redirect: 'follow',
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as SyncedPayload & { ok?: boolean; error?: string };
  if (data.ok === false || data.error) {
    throw new Error(data.error || 'Đồng bộ thất bại.');
  }

  if (options?.manual) {
    try {
      localStorage.setItem(LAST_SYNC_TS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  const payload: SyncedPayload = {
    updatedAt: data.updatedAt || new Date().toISOString(),
    events: Array.isArray(data.events) && data.events.length > 0 ? data.events : EVENT_HISTORY,
    hoanTuKimTieu: normalizeHoanTu(data.hoanTuKimTieu),
  };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
  return payload;
}

export async function pushEventRoundToSheet(params: {
  name: string;
  start: string;
  end: string;
  pin?: string;
  existingEvents?: TrackedEvent[];
}): Promise<{ ok: boolean; message: string }> {
  const url = getConfiguredApiUrl();
  if (!url) {
    return { ok: false, message: 'Chưa cấu hình nguồn đồng bộ dữ liệu.' };
  }

  const validationError = validateEventRoundInput(params);
  if (validationError) {
    return { ok: false, message: validationError };
  }

  const pin = (params.pin ?? getAdminPin()).trim();
  if (!pin) {
    return {
      ok: false,
      message: 'Vui lòng nhập Mã PIN Admin trong mục "Đồng bộ dữ liệu" trước khi lưu.',
    };
  }

  const rem = getPostCooldownRemaining();
  if (rem > 0) {
    return {
      ok: false,
      message: `Thao tác quá nhanh! Vui lòng đợi ${Math.ceil(rem / 1000)} giây để tránh spam.`,
    };
  }

  try {
    localStorage.setItem(LAST_POST_TS_KEY, String(Date.now()));
  } catch {
    // ignore
  }

  const res = await fetch(url, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'add_event_round',
      pin,
      name: params.name.trim(),
      start: params.start,
      end: params.end || params.start,
    }),
  });
  const json = (await res.json()) as { ok?: boolean; message?: string; error?: string };
  if (!json.ok) {
    return { ok: false, message: json.error || json.message || 'Không thể ghi lên Google Sheet.' };
  }
  return { ok: true, message: json.message || 'Đã ghi trực tiếp lên Google Sheet!' };
}
