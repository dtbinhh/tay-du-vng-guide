import { useEffect, useMemo, useState } from 'react';
import { Calculator, Clock, Gift, Info, Search, Sparkles, ZoomIn } from 'lucide-react';
import {
  CUU_U_IMAGES,
  DOI_QUYET_RANKS,
  EV_SINH_NHAT_IMAGES,
  HOAN_TU_KIM_TIEU_DATA,
  LAM_LANG_EVENTS,
  MANH_HA_HOAN_TRA,
  MANH_HA_SAT_CANH,
  type HoanTuKimTieuConfig,
} from '../data/gameData';
import type { LightboxImage } from './Lightbox';

export type EventTabKey =
  | 'hoan-tu'
  | 'lam-lang'
  | 'kim-tuong'
  | 'doi-quyet'
  | 'tich-xa'
  | 'ho-du'
  | 'manh-ha'
  | 'con-lon'
  | 'chieu-tai'
  | 'that-tich'
  | 'sinh-nhat'
  | 'cuu-u';

interface EventCalculatorsProps {
  selectedEvent: EventTabKey;
  onSelectEvent: (key: EventTabKey) => void;
  onOpenImage: (images: LightboxImage[], index: number) => void;
  syncedHoanTu?: HoanTuKimTieuConfig;
}

const EVENT_TABS: { id: EventTabKey; label: string }[] = [
  { id: 'hoan-tu', label: 'Hoan Tụ Kim Tiêu' },
  { id: 'lam-lang', label: 'Lâm Lang Tiên Các' },
  { id: 'kim-tuong', label: 'Kim Tướng' },
  { id: 'doi-quyet', label: 'Đối Quyết Đỉnh Cao' },
  { id: 'tich-xa', label: 'Tích Xả' },
  { id: 'ho-du', label: 'Hồ Du Tân Viên' },
  { id: 'manh-ha', label: 'Mạnh Hạ Hoan Ca' },
  { id: 'con-lon', label: 'Côn Lôn Tiên Cảnh' },
  { id: 'chieu-tai', label: 'Chiêu Tài' },
  { id: 'that-tich', label: 'Thất Tịch' },
  { id: 'sinh-nhat', label: 'Ev Sinh Nhật' },
  { id: 'cuu-u', label: 'Cửu U (11 ảnh)' },
];

export function EventCalculators({
  selectedEvent,
  onSelectEvent,
  onOpenImage,
  syncedHoanTu,
}: EventCalculatorsProps) {
  const htConfig = syncedHoanTu || HOAN_TU_KIM_TIEU_DATA;

  // Hoan Tu Kim Tieu state
  const [htIncludeFree, setHtIncludeFree] = useState(true);
  const [htInclude98, setHtInclude98] = useState(true);
  const [htIncludeQua5Ngay, setHtIncludeQua5Ngay] = useState(true);
  const [htIncludeCaNhan, setHtIncludeCaNhan] = useState(true);
  const [htIncludeTongMon, setHtIncludeTongMon] = useState(true);
  const [htPacks, setHtPacks] = useState(() =>
    htConfig.baoThiPacks.map((p) => ({ lb: p.lb, tickets: p.tickets, qty: p.defaultQty }))
  );

  useEffect(() => {
    if (syncedHoanTu?.baoThiPacks?.length) {
      setHtPacks(
        syncedHoanTu.baoThiPacks.map((p) => ({ lb: p.lb, tickets: p.tickets, qty: p.defaultQty }))
      );
    }
  }, [syncedHoanTu]);
  // Lam Lang state
  const [llSearch, setLlSearch] = useState('');
  const [llEventIdx, setLlEventIdx] = useState(0);

  // Doi Quyet state
  const [dqCurrentPts, setDqCurrentPts] = useState(0);
  const [dqTargetIdx, setDqTargetIdx] = useState(DOI_QUYET_RANKS.length - 1);

  // Kim Tuong state
  const [kimPacks, setKimPacks] = useState([
    { label: 'Gói 6 Lục Bảo', lb: 6, tickets: 1, qty: 1 },
    { label: 'Gói 30 Lục Bảo', lb: 30, tickets: 4, qty: 1 },
    { label: 'Gói 98 Lục Bảo', lb: 98, tickets: 8, qty: 1 },
    { label: 'Gói 198 Lục Bảo', lb: 198, tickets: 15, qty: 2 },
  ]);

  // Tich Xa state
  const [tichXa, setTichXa] = useState([
    { name: 'Thiên Giác Hoàn', pts: 10, cur: 100, maxPts: 1000 },
    { name: 'Ngự Thú Tiên Sách', pts: 20, cur: 100, maxPts: 2000 },
    { name: 'Lưới Bắt Ma', pts: 10, cur: 100, maxPts: 2000 },
    { name: 'Hoán Linh Bút', pts: 60, cur: 50, maxPts: 6000 },
    { name: 'Thiên Cơ Bàn', pts: 40, cur: 150, maxPts: 6000 },
    { name: 'Hoán Kỵ Tiên Linh', pts: 200, cur: 15, maxPts: 0 },
  ]);

  // Ho Du Tan Vien state
  const [hoDuItems, setHoDuItems] = useState([
    { name: 'Hoa đăng', pts: 5, qty: 115 },
    { name: 'Liên hoa', pts: 10, qty: 126 },
    { name: 'Uyên ương', pts: 15, qty: 100 },
    { name: 'Lý ảnh (Cá)', pts: 20, qty: 21 },
    { name: 'Du long (Long)', pts: 40, qty: 0 },
  ]);
  const [hoDuPacks, setHoDuPacks] = useState([
    { label: 'Gói 6 lb (3 Cá)', perPack: 3, qty: 1, lb: 6, ptsEach: 20 },
    { label: 'Gói 30 lb (9 Cá)', perPack: 9, qty: 2, lb: 30, ptsEach: 20 },
    { label: 'Gói 98 lb (15 Cá)', perPack: 15, qty: 2, lb: 98, ptsEach: 20 },
    { label: 'Gói 198 lb (15 Long)', perPack: 15, qty: 3, lb: 198, ptsEach: 40 },
  ]);

  // Manh Ha Hoan Ca state
  const [mhPacks, setMhPacks] = useState([
    { lb: 6, maxQty: 1, cam: 1, vang: 0, qty: 1 },
    { lb: 30, maxQty: 3, cam: 3, vang: 0, qty: 3 },
    { lb: 98, maxQty: 3, cam: 0, vang: 2, qty: 3 },
    { lb: 198, maxQty: 4, cam: 0, vang: 4, qty: 1 },
    { lb: 328, maxQty: 4, cam: 0, vang: 6, qty: 0 },
  ]);
  const [mhXuCo, setMhXuCo] = useState(0);
  const [mhMocHoanTra, setMhMocHoanTra] = useState(388);
  const [mhMocSatCanh, setMhMocSatCanh] = useState(0);

  // Con Lon state
  const [conLon, setConLon] = useState([
    { name: 'U Lan', need: 365000, cur: 336000, rate: 21100 },
    { name: 'Thần Mộc', need: 100000, cur: 45000, rate: 17900 },
    { name: 'Long Nham', need: 0, cur: 0, rate: 0 },
  ]);

  // Chieu Tai state
  const [ctItems, setCtItems] = useState([
    { name: 'Trâu tím', qty: 60, pts: 3 },
    { name: 'Hổ cam', qty: 1710, pts: 10 },
    { name: 'Sư cam', qty: 105, pts: 10 },
  ]);

  // That Tich state
  const [ttTim, setTtTim] = useState(0);
  const [ttCam, setTtCam] = useState(70);

  // Ev Sinh Nhat state
  const [snPacks, setSnPacks] = useState([
    { lb: 30, qty: 1, tran: 5 },
    { lb: 98, qty: 2, tran: 10 },
    { lb: 198, qty: 2, tran: 15 },
    { lb: 328, qty: 3, tran: 20 },
    { lb: 648, qty: 2, tran: 35 },
  ]);

  const htTotals = useMemo(() => {
    const anhDangLb = htInclude98 ? htConfig.anhDang.pack98Lb : 0;
    const anhDangTickets =
      (htIncludeFree ? htConfig.anhDang.freeTickets : 0) +
      (htInclude98 ? htConfig.anhDang.pack98Tickets : 0);
    const quaLb = htIncludeQua5Ngay ? htConfig.quaKimTieu.totalLb : 0;
    const quaTickets = htIncludeQua5Ngay
      ? htConfig.quaKimTieu.daysTickets + htConfig.quaKimTieu.bonus5DaysTickets
      : 0;
    const dauDo = htIncludeQua5Ngay ? htConfig.quaKimTieu.dauDo : 0;
    const tamViTickets =
      (htIncludeCaNhan ? htConfig.tamVi.caNhanTickets : 0) +
      (htIncludeTongMon ? htConfig.tamVi.tongMonTickets : 0);
    const baoThi = htPacks.reduce(
      (acc, p) => ({ lb: acc.lb + p.lb * p.qty, tickets: acc.tickets + p.tickets * p.qty }),
      { lb: 0, tickets: 0 }
    );
    return {
      anhDangLb,
      anhDangTickets,
      quaLb,
      quaTickets,
      dauDo,
      tamViTickets,
      baoThiLb: baoThi.lb,
      baoThiTickets: baoThi.tickets,
      totalLb: anhDangLb + quaLb + baoThi.lb,
      totalTickets: anhDangTickets + quaTickets + tamViTickets + baoThi.tickets,
    };
  }, [
    htIncludeFree,
    htInclude98,
    htIncludeQua5Ngay,
    htIncludeCaNhan,
    htIncludeTongMon,
    htPacks,
    htConfig,
  ]);

  // Computations
  const activeLL = LAM_LANG_EVENTS[llEventIdx] ?? LAM_LANG_EVENTS[0];
  const filteredFloors = useMemo(() => {
    const q = llSearch.trim().toLowerCase();
    if (!q) return activeLL.floors;
    return activeLL.floors.filter(
      (f) =>
        f.floor.toLowerCase().includes(q) ||
        f.item1.toLowerCase().includes(q) ||
        f.item2.toLowerCase().includes(q) ||
        f.item3.toLowerCase().includes(q)
    );
  }, [activeLL, llSearch]);

  const dqCalc = useMemo(() => {
    const targetPts = DOI_QUYET_RANKS.slice(0, dqTargetIdx + 1).reduce((s, r) => s + r.points, 0);
    const need = Math.max(0, targetPts - dqCurrentPts);
    return { targetPts, need, winsNeeded: Math.ceil(need / 20), losesNeeded: Math.ceil(need / 15) };
  }, [dqCurrentPts, dqTargetIdx]);

  const kimTotals = useMemo(
    () =>
      kimPacks.reduce(
        (acc, p) => ({ lb: acc.lb + p.lb * p.qty, tickets: acc.tickets + p.tickets * p.qty }),
        { lb: 0, tickets: 0 }
      ),
    [kimPacks]
  );

  const tichXaTotal = useMemo(() => tichXa.reduce((s, item) => s + item.pts * item.cur, 0), [tichXa]);
  const hoDuItemTotal = useMemo(() => hoDuItems.reduce((s, i) => s + i.pts * i.qty, 0), [hoDuItems]);
  const hoDuPackSummary = useMemo(
    () =>
      hoDuPacks.reduce(
        (acc, p) => ({ lb: acc.lb + p.lb * p.qty, pts: acc.pts + p.perPack * p.qty * p.ptsEach }),
        { lb: 0, pts: 0 }
      ),
    [hoDuPacks]
  );

  const mhSummary = useMemo(() => {
    const shopPts = mhPacks.reduce((s, p) => (p.cam > 0 ? s + p.qty * 50 : s + p.qty * 150 * p.vang), 0);
    const shopLb = mhPacks.reduce((s, p) => s + p.qty * p.lb, 0);
    const htRow = MANH_HA_HOAN_TRA.find((r) => r.moc === mhMocHoanTra);
    const htXu = htRow ? htRow.xuPhuongLuu : 0;
    const scRows = MANH_HA_SAT_CANH.filter((r) => r.moc <= mhMocSatCanh);
    const scXu = scRows.reduce((s, r) => s + r.hat, 0) * 50;
    const scLb = scRows.filter((r) => r.donVi === 'Lục bảo').reduce((s, r) => s + r.gia, 0);
    return { shopPts, htXu, scXu, totalXu: mhXuCo + shopPts + htXu + scXu, totalLb: shopLb + scLb };
  }, [mhPacks, mhXuCo, mhMocHoanTra, mhMocSatCanh]);

  const ctTotal = useMemo(() => ctItems.reduce((s, i) => s + i.qty * i.pts, 0), [ctItems]);
  const snSummary = useMemo(
    () =>
      snPacks.reduce(
        (acc, p) => ({ lb: acc.lb + p.lb * p.qty, tran: acc.tran + p.tran * p.qty }),
        { lb: 0, tran: 0 }
      ),
    [snPacks]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-6 h-6 text-amber-400" />
          Tổng Hợp Sự Kiện
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Tra cứu chi tiết, hình ảnh hướng dẫn và tính nhanh điểm, mốc thưởng, Lục Bảo cho toàn bộ sự kiện.
        </p>
      </div>

      {/* Event selector pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1">
        {EVENT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectEvent(t.id)}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
              selectedEvent === t.id
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-[#121722] text-slate-300 border-white/10 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Hoan Tu Kim Tieu */}
      {selectedEvent === 'hoan-tu' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kim Tieu Bao Thi */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">Kim Tiêu Bảo Thị (Gói Lục Bảo)</h2>
              <span className="text-xs text-slate-400">Nhập SL gói mua</span>
            </div>
            {htPacks.map((p, idx) => (
              <div
                key={p.lb}
                className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5"
              >
                <div>
                  <div className="text-sm font-semibold text-white">Gói {p.lb} Lục Bảo</div>
                  <div className="text-xs text-slate-400">{p.tickets} vé / gói</div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    value={p.qty}
                    onChange={(e) => {
                      const v = Math.max(0, Number(e.target.value) || 0);
                      setHtPacks((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: v } : x)));
                    }}
                    className="w-18 rounded-lg bg-[#0b0e14] border border-white/15 px-2 py-1 text-center font-mono text-sm text-white"
                  />
                  <span className="w-16 text-right font-mono text-xs text-amber-300">
                    {(p.lb * p.qty).toLocaleString()} lb
                  </span>
                  <span className="w-16 text-right font-mono text-xs font-semibold text-emerald-400">
                    {(p.tickets * p.qty).toLocaleString()} vé
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Kim Tieu Anh Dang + Total */}
          <div className="lg:col-span-5 space-y-5 self-start">
            <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
              <h2 className="font-semibold text-white">Kim Tiêu Ánh Đăng</h2>
              <label className="flex items-center justify-between rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5 cursor-pointer">
                <span className="flex items-center gap-2.5 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={htIncludeFree}
                    onChange={(e) => setHtIncludeFree(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  Nhận Free Ánh Đăng
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400">
                  +{htConfig.anhDang.freeTickets} vé
                </span>
              </label>
              <label className="flex items-center justify-between rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5 cursor-pointer">
                <span className="flex items-center gap-2.5 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={htInclude98}
                    onChange={(e) => setHtInclude98(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  Mở khóa gói {htConfig.anhDang.pack98Lb} Lục Bảo
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400">
                  +{htConfig.anhDang.pack98Tickets} vé
                </span>
              </label>
            </div>

            {/* Qua Kim Tieu 5 ngay */}
            <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-white">Quà Kim Tiêu (5 ngày)</h2>
                <span className="text-xs text-amber-300 font-mono">
                  Tổng: {htConfig.quaKimTieu.totalLb} lb
                </span>
              </div>
              <label className="flex items-start justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5 cursor-pointer">
                <span className="flex items-start gap-2.5 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={htIncludeQua5Ngay}
                    onChange={(e) => setHtIncludeQua5Ngay(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 mt-0.5"
                  />
                  <span>
                    Mua đủ 5 ngày ({htConfig.quaKimTieu.daysTickets} vé + thưởng{' '}
                    {htConfig.quaKimTieu.bonus5DaysTickets} vé)
                    <span className="block text-xs text-rose-300 mt-0.5">
                      +{htConfig.quaKimTieu.dauDo} Đậu đỏ
                    </span>
                  </span>
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400 shrink-0">
                  +{htConfig.quaKimTieu.daysTickets + htConfig.quaKimTieu.bonus5DaysTickets} vé
                </span>
              </label>
            </div>

            {/* Kim Tieu Tam Vi */}
            <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
              <h2 className="font-semibold text-white">Kim Tiêu Tầm Vị (Nhiệm vụ)</h2>
              <label className="flex items-start justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5 cursor-pointer">
                <span className="flex items-start gap-2.5 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={htIncludeCaNhan}
                    onChange={(e) => setHtIncludeCaNhan(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 mt-0.5"
                  />
                  <span>
                    Nhiệm vụ cá nhân
                    <span className="block text-xs text-amber-300 mt-0.5">
                      +{htConfig.tamVi.caNhanManh}
                    </span>
                  </span>
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400 shrink-0">
                  +{htConfig.tamVi.caNhanTickets} vé
                </span>
              </label>
              <label className="flex items-start justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5 cursor-pointer">
                <span className="flex items-start gap-2.5 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={htIncludeTongMon}
                    onChange={(e) => setHtIncludeTongMon(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 mt-0.5"
                  />
                  <span>
                    Nhiệm vụ tông môn
                    <span className="block text-xs text-amber-300 mt-0.5">
                      +{htConfig.tamVi.tongMonManh}
                    </span>
                  </span>
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400 shrink-0">
                  +{htConfig.tamVi.tongMonTickets} vé
                </span>
              </label>
            </div>

            <div className="rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-4 sm:p-5 space-y-3">
              <h2 className="font-semibold text-amber-300 text-sm">Tổng Kết Hoan Tụ Kim Tiêu</h2>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Ánh Đăng:</span>
                  <span className="font-mono">
                    {htTotals.anhDangLb} lb • <strong className="text-emerald-300">{htTotals.anhDangTickets} vé</strong>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quà Kim Tiêu (5 ngày):</span>
                  <span className="font-mono">
                    {htTotals.quaLb} lb • <strong className="text-emerald-300">{htTotals.quaTickets} vé</strong>
                    {htTotals.dauDo > 0 && <span className="text-rose-300"> • {htTotals.dauDo} đậu đỏ</span>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tầm Vị (Nhiệm vụ):</span>
                  <span className="font-mono">
                    <strong className="text-emerald-300">{htTotals.tamViTickets} vé</strong>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bảo Thị:</span>
                  <span className="font-mono">
                    {htTotals.baoThiLb.toLocaleString()} lb •{' '}
                    <strong className="text-emerald-300">{htTotals.baoThiTickets.toLocaleString()} vé</strong>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-amber-500/12 border border-amber-500/30 p-3.5 text-center">
                  <div className="text-xs text-slate-400">Tổng Lục Bảo</div>
                  <div className="text-2xl font-bold text-amber-400 font-mono">
                    {htTotals.totalLb.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-500/12 border border-emerald-500/30 p-3.5 text-center">
                  <div className="text-xs text-slate-400">Tổng Vé</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {htTotals.totalTickets.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lam Lang Tien Cac */}
      {selectedEvent === 'lam-lang' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {LAM_LANG_EVENTS.map((ev, idx) => (
                <button
                  key={ev.title}
                  onClick={() => setLlEventIdx(idx)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    idx === llEventIdx
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
                      : 'bg-[#121722] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {ev.title}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={llSearch}
                onChange={(e) => setLlSearch(e.target.value)}
                placeholder="Tìm vật phẩm..."
                className="w-full rounded-xl bg-[#121722] border border-white/12 pl-9 pr-3 py-1.5 text-sm text-white"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <h2 className="font-semibold text-white">{activeLL.title}</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng 6 tầng: 2,300 Đồng Lâm Lang</span>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                    <th className="py-2.5 px-4">Tầng</th>
                    <th className="py-2.5 px-3">Vật phẩm 1</th>
                    <th className="py-2.5 px-3">Vật phẩm 2</th>
                    <th className="py-2.5 px-3">Vật phẩm 3</th>
                    <th className="py-2.5 px-3 text-right">Giá Đồng</th>
                    <th className="py-2.5 px-4">Điều kiện mở khóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {filteredFloors.map((f) => (
                    <tr key={f.floor} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-amber-300 whitespace-nowrap">{f.floor}</td>
                      <td className="py-3 px-3 text-slate-200">{f.item1}</td>
                      <td className="py-3 px-3 text-slate-200">{f.item2}</td>
                      <td className="py-3 px-3 text-slate-200">{f.item3}</td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-300">
                        {f.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400">{f.unlockCondition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-white/8">
              {filteredFloors.map((f) => (
                <div key={f.floor} className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-300">{f.floor}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-xs font-semibold">
                      {f.price.toLocaleString()} Đồng
                    </span>
                  </div>
                  <ul className="text-xs text-slate-200 space-y-1 pl-3 list-disc marker:text-amber-500">
                    <li>{f.item1}</li>
                    <li>{f.item2}</li>
                    <li>{f.item3}</li>
                  </ul>
                  {f.unlockCondition !== '-' && (
                    <div className="text-[11px] text-slate-400">{f.unlockCondition}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Ảnh Tổng Hợp Lâm Lang Tiên Các</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Nhấn để xem full
              </span>
            </div>
            <button
              onClick={() => onOpenImage([{ file: '/images/image3.png', title: 'Lâm Lang Tiên Các' }], 0)}
              className="block w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 hover:border-amber-400/50 transition cursor-pointer"
            >
              <img src="/images/image3.png" alt="Lâm Lang Tiên Các" className="w-full h-auto" />
            </button>
          </div>
        </div>
      )}

      {/* Kim Tuong */}
      {selectedEvent === 'kim-tuong' && (
        <div className="max-w-2xl">
          <div className="rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Tính Gói Vé Quay Kim Tướng
              </div>
              <span className="text-xs text-slate-400">Nhập SL gói mua</span>
            </div>
            <div className="space-y-2.5">
              {kimPacks.map((p, idx) => (
                <div
                  key={p.lb}
                  className="flex items-center justify-between gap-3 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{p.label}</div>
                    <div className="text-xs text-slate-400">{p.tickets} vé / gói</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      value={p.qty}
                      onChange={(e) => {
                        const val = Math.max(0, Number(e.target.value) || 0);
                        setKimPacks((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, qty: val } : item))
                        );
                      }}
                      className="w-20 rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1.5 text-center text-sm font-mono text-white"
                    />
                    <span className="text-xs text-slate-400 font-mono w-16 text-right">
                      {p.lb * p.qty} lb
                    </span>
                    <span className="text-xs text-emerald-300 font-mono font-semibold w-14 text-right">
                      {p.tickets * p.qty} vé
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3.5 text-center">
                <div className="text-xs text-slate-400">Tổng Lục Bảo</div>
                <div className="text-2xl font-bold text-amber-400 font-mono">{kimTotals.lb}</div>
              </div>
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3.5 text-center">
                <div className="text-xs text-slate-400">Tổng Vé</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{kimTotals.tickets}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doi Quyet Dinh Cao */}
      {selectedEvent === 'doi-quyet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="font-semibold text-white">Bảng Thưởng Rank Đối Quyết Đỉnh Cao</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng điểm: 15,700</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                    <th className="py-2.5 px-4">Rank</th>
                    <th className="py-2.5 px-3">Thưởng rank</th>
                    <th className="py-2.5 px-3 text-right">Điểm mốc</th>
                    <th className="py-2.5 px-4 text-right">Thưởng tổng kết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {DOI_QUYET_RANKS.map((r, i) => (
                    <tr
                      key={r.rank}
                      className={i === dqTargetIdx ? 'bg-amber-500/10' : 'hover:bg-white/[0.02]'}
                    >
                      <td className="py-2.5 px-4 font-semibold text-amber-200">{r.rank}</td>
                      <td className="py-2.5 px-3 text-slate-200">{r.rankReward}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-sky-300">
                        {r.points.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-300">
                        {r.seasonReward.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-5 space-y-4 self-start">
            <h3 className="font-semibold text-amber-300 text-sm">Tính Số Trận Lên Rank</h3>
            <div className="flex gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300">Win: +20đ</span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300">Lose: +15đ</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Điểm hiện tại</label>
                <input
                  type="number"
                  min={0}
                  value={dqCurrentPts}
                  onChange={(e) => setDqCurrentPts(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Rank mục tiêu</label>
                <select
                  value={dqTargetIdx}
                  onChange={(e) => setDqTargetIdx(Number(e.target.value))}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                >
                  {DOI_QUYET_RANKS.map((r, i) => (
                    <option key={r.rank} value={i}>
                      {r.rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Tổng điểm mốc cần:</span>
                <strong className="font-mono text-white">{dqCalc.targetPts.toLocaleString()}đ</strong>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Còn thiếu:</span>
                <strong className="font-mono text-amber-300">{dqCalc.need.toLocaleString()}đ</strong>
              </div>
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-center">
                  <div className="text-[11px] text-slate-400">Nếu toàn Win</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">{dqCalc.winsNeeded} trận</div>
                </div>
                <div className="rounded-xl bg-rose-500/10 border border-rose-500/25 p-3 text-center">
                  <div className="text-[11px] text-slate-400">Nếu toàn Lose</div>
                  <div className="text-xl font-bold text-rose-400 font-mono">{dqCalc.losesNeeded} trận</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tich Xa */}
      {selectedEvent === 'tich-xa' && (
        <div className="rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
            <h2 className="font-semibold text-white">Tính Điểm Tích Xả</h2>
            <span className="text-sm font-mono font-bold text-amber-400">
              Tổng: {tichXaTotal.toLocaleString()} điểm
            </span>
          </div>
          <div className="p-4 space-y-3">
            {tichXa.map((item, idx) => {
              const earned = item.pts * item.cur;
              const needQty = item.maxPts > 0 ? Math.ceil(item.maxPts / item.pts) : 0;
              const pct = item.maxPts > 0 ? Math.min(100, Math.round((earned / item.maxPts) * 100)) : 100;
              return (
                <div key={item.name} className="rounded-xl border border-white/8 bg-[#0c1018] p-3.5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-white">{item.name}</div>
                      <div className="text-xs text-slate-400">
                        {item.pts} điểm/cái
                        {item.maxPts > 0 && ` • Tối đa ${item.maxPts.toLocaleString()}đ (${needQty} cái)`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs text-slate-400">Hiện có:</label>
                      <input
                        type="number"
                        min={0}
                        value={item.cur}
                        onChange={(e) => {
                          const v = Math.max(0, Number(e.target.value) || 0);
                          setTichXa((prev) => prev.map((x, i) => (i === idx ? { ...x, cur: v } : x)));
                        }}
                        className="w-24 rounded-lg bg-[#161c2c] border border-white/15 px-2.5 py-1.5 text-sm font-mono text-white text-right"
                      />
                      <span className="font-mono font-bold text-emerald-400 w-24 text-right">
                        {earned.toLocaleString()} đ
                      </span>
                    </div>
                  </div>
                  {item.maxPts > 0 && (
                    <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ho Du Tan Vien */}
      {selectedEvent === 'ho-du' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-white">Điểm Vật Phẩm Hiện Có</h2>
                <span className="font-mono font-bold text-amber-400 text-lg">
                  {hoDuItemTotal.toLocaleString()} đ
                </span>
              </div>
              {hoDuItems.map((item, idx) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3 py-2"
                >
                  <div>
                    <span className="text-sm text-white font-medium">{item.name}</span>
                    <span className="text-xs text-slate-400 ml-2">({item.pts}đ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={item.qty}
                      onChange={(e) => {
                        const v = Math.max(0, Number(e.target.value) || 0);
                        setHoDuItems((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: v } : x)));
                      }}
                      className="w-20 rounded-lg bg-[#0b0e14] border border-white/15 px-2 py-1 text-right font-mono text-sm text-white"
                    />
                    <span className="w-16 text-right font-mono text-sm text-emerald-400">
                      {(item.qty * item.pts).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3 text-xs text-amber-200 space-y-1">
                <div>• Tích đủ <strong>2,625</strong> xả mở Shop 2 (nhận +375đ mốc quà → 3,000)</div>
                <div>• Tích đủ <strong>3,825</strong> xả mở Shop 3 (nhận +675đ mốc quà → 4,500)</div>
                <div>• Tích đủ <strong>4,925</strong> xả mở Shop 4 (nhận +1,075đ mốc quà → 6,000)</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-white">Tính Gói Lục Bảo</h2>
                <span className="text-xs text-slate-400">Cá = 20đ | Long = 40đ</span>
              </div>
              {hoDuPacks.map((p, idx) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3 py-2"
                >
                  <span className="text-xs sm:text-sm text-slate-200">{p.label}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={p.qty}
                      onChange={(e) => {
                        const v = Math.max(0, Number(e.target.value) || 0);
                        setHoDuPacks((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: v } : x)));
                      }}
                      className="w-16 rounded-lg bg-[#0b0e14] border border-white/15 px-2 py-1 text-center font-mono text-sm text-white"
                    />
                    <span className="w-20 text-right font-mono text-xs text-amber-300">
                      {(p.perPack * p.qty * p.ptsEach).toLocaleString()}đ
                    </span>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3 text-center">
                  <div className="text-xs text-slate-400">Tổng Lục Bảo</div>
                  <div className="text-xl font-bold text-amber-400 font-mono">{hoDuPackSummary.lb}</div>
                </div>
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-center">
                  <div className="text-xs text-slate-400">Tổng Điểm Gói</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {hoDuPackSummary.pts.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden self-start">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <h2 className="font-semibold text-white">Bảng Mốc Quà Hồ Du Tân Viên</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                  <th className="py-2.5 px-4">Mốc điểm</th>
                  <th className="py-2.5 px-3">Quà nhận</th>
                  <th className="py-2.5 px-4 text-right">Điểm quy đổi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {[
                  { moc: 200, qua: '5 Hoa đăng', d: 25 },
                  { moc: 500, qua: '5 Liên hoa', d: 50 },
                  { moc: 900, qua: '5 Liên hoa', d: 50 },
                  { moc: 1400, qua: '5 Uyên ương', d: 75 },
                  { moc: 1900, qua: '5 Uyên ương', d: 75 },
                  { moc: 2500, qua: '5 Lý ảnh', d: 100 },
                  { moc: 3100, qua: '5 Lý ảnh', d: 100 },
                  { moc: 3900, qua: '5 Du long', d: 200 },
                  { moc: 4700, qua: '5 Du long', d: 200 },
                  { moc: 5500, qua: '5 Du long', d: 200 },
                  { moc: 6300, qua: '5 Du long', d: 200 },
                  { moc: 7100, qua: '5 Du long', d: 200 },
                ].map((r) => (
                  <tr
                    key={r.moc}
                    className={hoDuItemTotal >= r.moc ? 'bg-emerald-500/8' : 'hover:bg-white/[0.02]'}
                  >
                    <td className="py-2 px-4 font-mono font-semibold text-amber-200">{r.moc.toLocaleString()}</td>
                    <td className="py-2 px-3 text-slate-200">{r.qua}</td>
                    <td className="py-2 px-4 text-right font-mono text-emerald-300">+{r.d}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manh Ha Hoan Ca */}
      {selectedEvent === 'manh-ha' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-3.5 text-xs text-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Hướng dẫn: Điền số lượng gói mua trong shop, nhập xu hiện có, chọn mốc Hoàn Trả và mốc Sát Cánh để tính Tổng Xu & Tổng Lục Bảo.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-3">
              <h2 className="font-semibold text-white">Gói Shop Lục Bảo</h2>
              {mhPacks.map((p, idx) => (
                <div
                  key={p.lb}
                  className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3 py-2.5"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">Gói {p.lb} Lục Bảo</div>
                    <div className="text-xs text-slate-400">
                      {p.cam > 0 ? `${p.cam} hạt cam/gói` : `${p.vang} hạt vàng/gói`} • Tối đa {p.maxQty} gói
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={p.maxQty}
                      value={p.qty}
                      onChange={(e) => {
                        const v = Math.max(0, Number(e.target.value) || 0);
                        setMhPacks((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: v } : x)));
                      }}
                      className="w-16 rounded-lg bg-[#0b0e14] border border-white/15 px-2 py-1 text-center font-mono text-sm text-white"
                    />
                    <span className="w-16 text-right font-mono text-xs text-amber-300">{p.qty * p.lb} lb</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-4 sm:p-5 space-y-4">
              <h2 className="font-semibold text-amber-300">Tổng Hợp Mạnh Hạ Hoan Ca</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Xu hiện có</label>
                  <input
                    type="number"
                    min={0}
                    value={mhXuCo}
                    onChange={(e) => setMhXuCo(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mốc Hoàn Trả</label>
                  <select
                    value={mhMocHoanTra}
                    onChange={(e) => setMhMocHoanTra(Number(e.target.value))}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    {MANH_HA_HOAN_TRA.map((r) => (
                      <option key={r.moc} value={r.moc}>
                        Mốc {r.moc} (+{r.xuPhuongLuu} xu Phượng Lưu)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mốc Sát Cánh</label>
                  <select
                    value={mhMocSatCanh}
                    onChange={(e) => setMhMocSatCanh(Number(e.target.value))}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    {MANH_HA_SAT_CANH.map((r) => (
                      <option key={r.moc} value={r.moc}>
                        Mốc {r.moc} ({r.gia ? `${r.gia} ${r.donVi}` : r.donVi})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span>Xu mua từ shop:</span>
                  <strong className="font-mono">{mhSummary.shopPts.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Xu mốc hoàn trả:</span>
                  <strong className="font-mono">{mhSummary.htXu.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Xu mốc sát cánh:</span>
                  <strong className="font-mono">{mhSummary.scXu.toLocaleString()}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-500/12 border border-emerald-500/30 p-3 text-center">
                  <div className="text-xs text-slate-400">Tổng Xu</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {mhSummary.totalXu.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-amber-500/12 border border-amber-500/30 p-3 text-center">
                  <div className="text-xs text-slate-400">Tổng Lục Bảo</div>
                  <div className="text-2xl font-bold text-amber-400 font-mono">
                    {mhSummary.totalLb.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Con Lon Tien Canh */}
      {selectedEvent === 'con-lon' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-white/10 bg-[#121722] p-3.5">
              <div className="text-xs text-slate-400">Tiên tủy / 1 giờ</div>
              <div className="text-lg font-bold text-amber-400">20 Tiên tủy</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#121722] p-3.5">
              <div className="text-xs text-slate-400">Tiên tủy / 12 giờ</div>
              <div className="text-lg font-bold text-amber-400">240 Tiên tủy</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#121722] p-3.5">
              <div className="text-xs text-slate-400">Dame gốc</div>
              <div className="text-lg font-bold text-rose-400">100 HP</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#121722] p-3.5">
              <div className="text-xs text-slate-400">Thời gian 1 turn</div>
              <div className="text-lg font-bold text-sky-400">3 phút</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Clock className="w-4 h-4 text-amber-400" />
              Tính Thời Gian Đợi Tài Nguyên
            </div>
            <div className="space-y-3">
              {conLon.map((res, idx) => {
                const remain = Math.max(0, res.need - res.cur);
                const hours = res.rate > 0 ? remain / res.rate : 0;
                const mins = Math.round(hours * 60);
                return (
                  <div
                    key={res.name}
                    className="rounded-xl bg-black/30 border border-white/8 p-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    <div className="sm:col-span-2 font-semibold text-amber-300">{res.name}</div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-slate-400 mb-1">Cần</label>
                      <input
                        type="number"
                        min={0}
                        value={res.need}
                        onChange={(e) => {
                          const v = Math.max(0, Number(e.target.value) || 0);
                          setConLon((prev) => prev.map((x, i) => (i === idx ? { ...x, need: v } : x)));
                        }}
                        className="w-full rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1.5 font-mono text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-slate-400 mb-1">Hiện có</label>
                      <input
                        type="number"
                        min={0}
                        value={res.cur}
                        onChange={(e) => {
                          const v = Math.max(0, Number(e.target.value) || 0);
                          setConLon((prev) => prev.map((x, i) => (i === idx ? { ...x, cur: v } : x)));
                        }}
                        className="w-full rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1.5 font-mono text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-slate-400 mb-1">Sản lượng/giờ</label>
                      <input
                        type="number"
                        min={0}
                        value={res.rate}
                        onChange={(e) => {
                          const v = Math.max(0, Number(e.target.value) || 0);
                          setConLon((prev) => prev.map((x, i) => (i === idx ? { ...x, rate: v } : x)));
                        }}
                        className="w-full rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1.5 font-mono text-sm text-white"
                      />
                    </div>
                    <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <div className="text-[11px] text-slate-400">Thời gian đợi</div>
                        <div className="font-mono font-bold text-emerald-400">
                          {res.rate > 0 ? `${hours.toFixed(2)} giờ (${mins} phút)` : 'Nhập sản lượng'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Chieu Tai */}
      {selectedEvent === 'chieu-tai' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#121722]/90 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-white">Tính Điểm Chiêu Tài</h2>
              <span className="font-mono font-bold text-amber-400 text-lg">{ctTotal.toLocaleString()} đ</span>
            </div>
            {ctItems.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5"
              >
                <div>
                  <span className="text-sm font-medium text-white">{item.name}</span>
                  <span className="text-xs text-slate-400 ml-2">({item.pts}đ)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => {
                      const v = Math.max(0, Number(e.target.value) || 0);
                      setCtItems((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: v } : x)));
                    }}
                    className="w-24 rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1 text-right font-mono text-sm text-white"
                  />
                  <span className="w-20 text-right font-mono font-semibold text-emerald-400">
                    {(item.qty * item.pts).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/25 p-3 text-xs text-purple-200">
              💡 <strong>Ghi chú mốc Tím:</strong> Ngày 1 = 90k • Ngày 2 = 180k • Ngày 3 = 270k
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#121722]/90 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-white">Ảnh Tham Khảo Chiêu Tài</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Nhấn để phóng to
              </span>
            </div>
            <button
              onClick={() => onOpenImage([{ file: '/images/image2.jpg', title: 'Chiêu Tài' }], 0)}
              className="block w-full overflow-hidden rounded-xl border border-white/10 hover:border-amber-400/50 transition cursor-pointer"
            >
              <img src="/images/image2.jpg" alt="Chiêu Tài" className="w-full h-auto" />
            </button>
          </div>
        </div>
      )}

      {/* That Tich */}
      {selectedEvent === 'that-tich' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-white">Tính Điểm Thất Tịch</h2>
              <span className="font-mono font-bold text-amber-400 text-lg">
                {(ttTim * 10 + ttCam * 20).toLocaleString()} đ
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5">
                <span className="text-sm text-purple-300 font-medium">Tím (10 điểm)</span>
                <input
                  type="number"
                  min={0}
                  value={ttTim}
                  onChange={(e) => setTtTim(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1 text-right font-mono text-sm text-white"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5">
                <span className="text-sm text-amber-300 font-medium">Cam (20 điểm)</span>
                <input
                  type="number"
                  min={0}
                  value={ttCam}
                  onChange={(e) => setTtCam(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 rounded-lg bg-[#0b0e14] border border-white/15 px-2.5 py-1 text-right font-mono text-sm text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121722]/90 p-5 space-y-3">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Điểm Danh & Gói Thất Tịch
            </h2>
            <div className="text-sm text-slate-300 space-y-1.5">
              <div>• Điểm danh 5 ngày: 3/ngày × 5 = <strong className="text-emerald-400">15</strong></div>
              <div>• Gói cơ bản: <strong className="text-amber-300">36</strong> (Tổng điểm danh + gói = <strong>51</strong>)</div>
              <div>• Các gói mở rộng: <strong className="text-amber-300">128</strong> / <strong className="text-amber-300">196</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* Ev Sinh Nhat */}
      {selectedEvent === 'sinh-nhat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 p-5 space-y-3">
              <h2 className="font-semibold text-white">Tính Gói Trấn Yêu Đồ (Ev Sinh Nhật)</h2>
              {snPacks.map((p, idx) => (
                <div
                  key={p.lb}
                  className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/8 px-3.5 py-2.5"
                >
                  <div>
                    <div className="text-sm font-medium text-white">Gói {p.lb} Lục Bảo</div>
                    <div className="text-xs text-slate-400">{p.tran} Trấn yêu đồ / gói</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      value={p.qty}
                      onChange={(e) => {
                        const v = Math.max(0, Number(e.target.value) || 0);
                        setSnPacks((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: v } : x)));
                      }}
                      className="w-16 rounded-lg bg-[#0b0e14] border border-white/15 px-2 py-1 text-center font-mono text-sm text-white"
                    />
                    <span className="w-20 text-right font-mono text-xs text-emerald-400">
                      {p.tran * p.qty} trấn
                    </span>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3 text-center">
                  <div className="text-xs text-slate-400">Tổng Lục Bảo</div>
                  <div className="text-xl font-bold text-amber-400 font-mono">
                    {snSummary.lb.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-center">
                  <div className="text-xs text-slate-400">Tổng Trấn Yêu Đồ</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {snSummary.tran.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#121722]/90 p-5 space-y-3 self-start">
              <h2 className="font-semibold text-white">Ghi Chú Free & Đổi Quà</h2>
              <div className="text-sm text-slate-300 space-y-2">
                <div>• Bát Giới: <strong className="text-amber-300">24</strong> | Free shop: <strong className="text-amber-300">8</strong> | Khác: <strong>11</strong></div>
                <div>• Skin 328lb: <strong>328 Lục bảo</strong> (28 Trấn yêu đồ) — kèm khung, danh hiệu</div>
                <div>• Mốc đổi khác: 0 lb (27 trấn) • 48 lb (16 trấn)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EV_SINH_NHAT_IMAGES.map((img, idx) => (
              <button
                key={img.file}
                onClick={() => onOpenImage(EV_SINH_NHAT_IMAGES, idx)}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[#121722] hover:border-amber-400/50 transition text-left cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={img.file}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-200">
                  <span>{img.title}</span>
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cuu U */}
      {selectedEvent === 'cuu-u' && (
        <div className="space-y-4">
          <div className="text-sm text-slate-400">
            Thư viện {CUU_U_IMAGES.length} ảnh hướng dẫn Cửu U Mùa 1. Nhấn vào bất kỳ ảnh nào để phóng to và chuyển ảnh.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {CUU_U_IMAGES.map((img, idx) => (
              <button
                key={img.file}
                onClick={() => onOpenImage(CUU_U_IMAGES, idx)}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#121722] hover:border-amber-400/50 transition text-left cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={img.file}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="px-3 py-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-200 truncate">{img.title}</span>
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
