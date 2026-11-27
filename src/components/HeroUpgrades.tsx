import { useMemo, useState } from 'react';
import { Calculator, Gem, Swords } from 'lucide-react';
import {
  CHIEN_LINH_TIERS,
  HERO_UPGRADE_CATEGORIES,
  LINH_KY_TIERS,
  LUC_AN_TIERS,
  MO_HINH_TIERS,
  PHAP_BAO_DATA,
  PHAP_BAO_MAIN_DO,
  PHAP_BAO_MAIN_KIM,
  THIEN_KY_GROUPS,
  TIEN_TANG_TIERS,
  TINH_HON_TIERS,
} from '../data/gameData';

export type ResourceTabKey =
  | 'tuong'
  | 'thien-ky'
  | 'phap-bao'
  | 'mo-hinh'
  | 'luc-an'
  | 'linh-ky'
  | 'tien-tang'
  | 'tinh-hon'
  | 'chien-linh';

interface HeroUpgradesProps {
  selectedResource: ResourceTabKey;
  onSelectResource: (key: ResourceTabKey) => void;
}

const RESOURCE_TABS: { id: ResourceTabKey; label: string }[] = [
  { id: 'tuong', label: 'Up Tướng' },
  { id: 'thien-ky', label: 'Thiên Kỹ & Thần Kích' },
  { id: 'phap-bao', label: 'Pháp Bảo' },
  { id: 'mo-hinh', label: 'Mô Hình' },
  { id: 'luc-an', label: 'Lục Ấn' },
  { id: 'linh-ky', label: 'Linh Kỵ' },
  { id: 'tien-tang', label: 'Tiên Tàng' },
  { id: 'tinh-hon', label: 'Tinh Hồn' },
  { id: 'chien-linh', label: 'Chiến Linh' },
];

const COLOR_STYLES: Record<string, string> = {
  red: 'bg-red-500/15 text-red-300 border-red-500/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  yellow: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
  purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

export function HeroUpgrades({ selectedResource, onSelectResource }: HeroUpgradesProps) {
  // Hero upgrade state
  const [catId, setCatId] = useState(HERO_UPGRADE_CATEGORIES[0].id);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(2);

  // Generic range states for new resource tables
  const [tkId, setTkId] = useState(THIEN_KY_GROUPS[0].id);
  const [tkRange, setTkRange] = useState<[number, number]>([0, 5]);
  const [mhRange, setMhRange] = useState<[number, number]>([0, MO_HINH_TIERS.length - 1]);
  const [laRange, setLaRange] = useState<[number, number]>([0, LUC_AN_TIERS.length - 1]);
  const [lkRange, setLkRange] = useState<[number, number]>([0, LINH_KY_TIERS.length - 1]);
  const [ttRange, setTtRange] = useState<[number, number]>([0, TIEN_TANG_TIERS.length - 1]);
  const [thRange, setThRange] = useState<[number, number]>([0, TINH_HON_TIERS.length - 1]);

  const activeCat = useMemo(
    () => HERO_UPGRADE_CATEGORIES.find((c) => c.id === catId) ?? HERO_UPGRADE_CATEGORIES[0],
    [catId]
  );

  const safeFrom = Math.min(fromIdx, activeCat.rows.length - 1);
  const safeTo = Math.min(Math.max(toIdx, safeFrom), activeCat.rows.length - 1);

  const calcTotals = useMemo(() => {
    const slice = activeCat.rows.slice(safeFrom, safeTo + 1);
    return slice.reduce(
      (acc, r) => ({
        shards: acc.shards + (r.shards || 0),
        kinhThi: acc.kinhThi + (r.kinhThi || 0),
        kinhThi2: acc.kinhThi2 + (r.kinhThi2 || 0),
        kinhThi3: acc.kinhThi3 + (r.kinhThi3 || 0),
        phoiUp: acc.phoiUp + (r.phoiUp || 0),
        phiLinhQuyet: acc.phiLinhQuyet + (r.phiLinhQuyet || 0),
        ky: acc.ky + (r.ky || 0),
        kyGioiHan: acc.kyGioiHan + (r.kyGioiHan || 0),
      }),
      { shards: 0, kinhThi: 0, kinhThi2: 0, kinhThi3: 0, phoiUp: 0, phiLinhQuyet: 0, ky: 0, kyGioiHan: 0 }
    );
  }, [activeCat, safeFrom, safeTo]);

  const activeTk = useMemo(
    () => THIEN_KY_GROUPS.find((g) => g.id === tkId) ?? THIEN_KY_GROUPS[0],
    [tkId]
  );

  const tkTotals = useMemo(() => {
    const slice = activeTk.rows.slice(tkRange[0], tkRange[1] + 1);
    const totals: Record<string, number> = {};
    for (const col of activeTk.columns) {
      if (col.key === 'star') continue;
      let sum = 0;
      for (const r of slice) {
        const v = r[col.key];
        if (typeof v === 'number') sum += v;
        else if (typeof v === 'string') {
          const m = v.match(/\d+/);
          if (m) sum += Number(m[0]);
        }
      }
      totals[col.key] = sum;
    }
    return totals;
  }, [activeTk, tkRange]);

  const mhTotal = useMemo(
    () => MO_HINH_TIERS.slice(mhRange[0], mhRange[1] + 1).reduce((s, x) => s + x.cost, 0),
    [mhRange]
  );
  const laTotal = useMemo(
    () => LUC_AN_TIERS.slice(laRange[0], laRange[1] + 1).reduce((s, x) => s + x.shards, 0),
    [laRange]
  );
  const lkTotal = useMemo(
    () =>
      LINH_KY_TIERS.slice(lkRange[0], lkRange[1] + 1).reduce(
        (acc, x) => ({ shards: acc.shards + x.shards, ngoc: acc.ngoc + x.ngoc }),
        { shards: 0, ngoc: 0 }
      ),
    [lkRange]
  );
  const ttTotal = useMemo(
    () =>
      TIEN_TANG_TIERS.slice(ttRange[0], ttRange[1] + 1).reduce(
        (acc, x) => ({ shards: acc.shards + x.shards, thach: acc.thach + x.thach }),
        { shards: 0, thach: 0 }
      ),
    [ttRange]
  );
  const thTotal = useMemo(
    () =>
      TINH_HON_TIERS.slice(thRange[0], thRange[1] + 1).reduce(
        (acc, x) => ({ tinhPhach: acc.tinhPhach + x.tinhPhach, chuHonNghi: acc.chuHonNghi + x.chuHonNghi }),
        { tinhPhach: 0, chuHonNghi: 0 }
      ),
    [thRange]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white flex items-center gap-2">
          <Swords className="w-6 h-6 text-amber-400" />
          Tài Nguyên Nâng Cấp
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Tra cứu & tính nhanh nguyên liệu nâng cấp Tướng, Pháp Bảo, Mô Hình, Lục Ấn, Linh Kỵ, Tiên Tàng, Tinh Hồn và Chiến Linh.
        </p>
      </div>

      {/* Main Resource Type Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1">
        {RESOURCE_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectResource(t.id)}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
              selectedResource === t.id
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-[#121722] text-slate-300 border-white/10 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. UP TUONG */}
      {selectedResource === 'tuong' && (
        <div className="space-y-5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {HERO_UPGRADE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCatId(cat.id);
                  setFromIdx(0);
                  setToIdx(cat.rows.length - 1);
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                  cat.id === activeCat.id
                    ? COLOR_STYLES[cat.color]
                    : 'bg-[#121722] border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                <h2 className="font-semibold text-white">{activeCat.name}</h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border ${COLOR_STYLES[activeCat.color]}`}>
                  {activeCat.rows.length} mốc
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                      {activeCat.columns.map((col) => (
                        <th key={col.key} className="py-2.5 px-3.5 font-medium whitespace-nowrap">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/6">
                    {activeCat.rows.map((row, idx) => {
                      const inRange = idx >= safeFrom && idx <= safeTo;
                      return (
                        <tr
                          key={row.star}
                          className={inRange ? 'bg-amber-500/[0.06]' : 'hover:bg-white/[0.02]'}
                        >
                          {activeCat.columns.map((col) => {
                            const val = row[col.key];
                            return (
                              <td
                                key={col.key}
                                className={`py-2.5 px-3.5 ${
                                  col.key === 'star'
                                    ? 'font-semibold text-amber-300'
                                    : col.key === 'shards'
                                    ? 'font-mono font-semibold text-white'
                                    : 'text-slate-300'
                                }`}
                              >
                                {val === undefined || val === null
                                  ? '—'
                                  : typeof val === 'number'
                                  ? val.toLocaleString()
                                  : val}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {activeCat.summaryNote && (
                <div className="px-4 py-3 bg-amber-500/8 border-t border-amber-500/20 text-xs text-amber-200">
                  💡 {activeCat.summaryNote}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-4 sm:p-5 space-y-4 self-start">
              <div className="flex items-center gap-2 font-semibold text-amber-300 text-sm">
                <Calculator className="w-4 h-4" />
                Tính nhanh nguyên liệu ({activeCat.name})
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Từ mốc</label>
                  <select
                    value={safeFrom}
                    onChange={(e) => setFromIdx(Number(e.target.value))}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    {activeCat.rows.map((r, i) => (
                      <option key={r.star} value={i}>
                        {r.star}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Đến mốc</label>
                  <select
                    value={safeTo}
                    onChange={(e) => setToIdx(Number(e.target.value))}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    {activeCat.rows.map((r, i) => (
                      <option key={r.star} value={i} disabled={i < safeFrom}>
                        {r.star}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                  <div className="text-[11px] text-slate-400">Tổng số mảnh</div>
                  <div className="text-xl font-bold text-amber-400 font-mono">
                    {calcTotals.shards.toLocaleString()}
                  </div>
                </div>
                {calcTotals.kinhThi > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">
                      {calcTotals.kinhThi2 > 0 ? 'Kinh thi Phong' : 'Kinh thi'}
                    </div>
                    <div className="text-xl font-bold text-sky-400 font-mono">
                      {calcTotals.kinhThi.toLocaleString()}
                    </div>
                  </div>
                )}
                {calcTotals.kinhThi2 > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">Kinh thi Nhã</div>
                    <div className="text-xl font-bold text-sky-400 font-mono">
                      {calcTotals.kinhThi2.toLocaleString()}
                    </div>
                  </div>
                )}
                {calcTotals.kinhThi3 > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">Kinh thi Tụng</div>
                    <div className="text-xl font-bold text-sky-400 font-mono">
                      {calcTotals.kinhThi3.toLocaleString()}
                    </div>
                  </div>
                )}
                {calcTotals.phoiUp > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">Phôi up</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">
                      {calcTotals.phoiUp.toLocaleString()}
                    </div>
                  </div>
                )}
                {calcTotals.phiLinhQuyet > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">Phí linh quyết</div>
                    <div className="text-xl font-bold text-rose-400 font-mono">
                      {calcTotals.phiLinhQuyet.toLocaleString()}
                    </div>
                  </div>
                )}
                {calcTotals.ky > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">Kỹ</div>
                    <div className="text-xl font-bold text-purple-400 font-mono">
                      {calcTotals.ky.toLocaleString()}
                    </div>
                  </div>
                )}
                {calcTotals.kyGioiHan > 0 && (
                  <div className="rounded-xl bg-black/35 border border-white/8 p-3">
                    <div className="text-[11px] text-slate-400">Kỹ giới hạn</div>
                    <div className="text-xl font-bold text-fuchsia-400 font-mono">
                      {calcTotals.kyGioiHan.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1B. THIEN KY & THAN KICH */}
      {selectedResource === 'thien-ky' && (
        <div className="space-y-5">
          {/* Group selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {THIEN_KY_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setTkId(g.id);
                  setTkRange([0, g.rows.length - 1]);
                }}
                className={`text-left rounded-xl border p-3 transition cursor-pointer ${
                  g.id === activeTk.id
                    ? COLOR_STYLES[g.color]
                    : 'bg-[#121722] border-white/10 text-slate-300 hover:border-white/25'
                }`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  {g.category}
                </div>
                <div className="text-sm font-semibold mt-0.5 leading-snug">{g.skillNames}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-white">{activeTk.skillNames}</h2>
                  <div className="text-xs text-slate-400">{activeTk.category}</div>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border ${COLOR_STYLES[activeTk.color]}`}>
                  1s → 6s
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                      {activeTk.columns.map((col) => (
                        <th key={col.key} className="py-2.5 px-3.5 font-medium whitespace-nowrap">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/6">
                    {activeTk.rows.map((row, idx) => (
                      <tr
                        key={String(row.star)}
                        className={
                          idx >= tkRange[0] && idx <= tkRange[1]
                            ? 'bg-amber-500/[0.06]'
                            : 'hover:bg-white/[0.02]'
                        }
                      >
                        {activeTk.columns.map((col) => {
                          const val = row[col.key];
                          return (
                            <td
                              key={col.key}
                              className={`py-2.5 px-3.5 ${
                                col.key === 'star'
                                  ? 'font-semibold text-amber-300'
                                  : 'font-mono text-slate-200'
                              }`}
                            >
                              {typeof val === 'number' ? val.toLocaleString() : val}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-4 sm:p-5 space-y-4 self-start">
              <div className="flex items-center gap-2 font-semibold text-amber-300 text-sm">
                <Calculator className="w-4 h-4" />
                Tính tổng nguyên liệu ({activeTk.category})
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Từ sao</label>
                  <select
                    value={tkRange[0]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setTkRange([v, Math.max(v, tkRange[1])]);
                    }}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    {activeTk.rows.map((r, i) => (
                      <option key={String(r.star)} value={i}>
                        {r.star}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Đến sao</label>
                  <select
                    value={tkRange[1]}
                    onChange={(e) => setTkRange([tkRange[0], Number(e.target.value)])}
                    className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    {activeTk.rows.map((r, i) => (
                      <option key={String(r.star)} value={i} disabled={i < tkRange[0]}>
                        {r.star}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {activeTk.columns
                  .filter((c) => c.key !== 'star')
                  .map((col) => (
                    <div key={col.key} className="rounded-xl bg-black/35 border border-white/8 p-3">
                      <div className="text-[11px] text-slate-400">{col.label}</div>
                      <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                        {(tkTotals[col.key] ?? 0).toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PHAP BAO */}
      {selectedResource === 'phap-bao' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PHAP_BAO_DATA.map((pb) => (
              <div
                key={pb.name}
                className={`rounded-2xl border p-5 ${
                  pb.color === 'red'
                    ? 'bg-red-500/8 border-red-500/25'
                    : 'bg-yellow-500/8 border-yellow-500/25'
                }`}
              >
                <div className="font-semibold text-base text-white flex items-center gap-2 mb-3">
                  <Gem className="w-4 h-4 text-amber-400" />
                  {pb.name}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-black/30 p-2.5">
                    <div className="text-[11px] text-slate-400">Đá</div>
                    <div className="font-mono font-bold text-white mt-0.5">{pb.da}</div>
                  </div>
                  <div className="rounded-xl bg-black/30 p-2.5">
                    <div className="text-[11px] text-slate-400">Pháp bảo</div>
                    <div className="font-mono font-bold text-amber-300 mt-0.5">{pb.phapBao}</div>
                  </div>
                  <div className="rounded-xl bg-black/30 p-2.5">
                    <div className="text-[11px] text-slate-400">Bạc</div>
                    <div className="font-mono font-bold text-emerald-300 mt-0.5">{pb.bac}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phap bao main do */}
            <div className="rounded-2xl border border-red-500/25 bg-[#121722]/90 overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-red-500/8 flex justify-between items-center">
                <h2 className="font-semibold text-white">Pháp Bảo Main Đỏ (Thần Rèn)</h2>
                <span className="text-xs text-red-300 font-semibold">3 Giai đoạn</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                    <th className="py-2.5 px-4">Giai đoạn</th>
                    <th className="py-2.5 px-3 text-right">Sở từ</th>
                    <th className="py-2.5 px-4 text-right">Kinh thi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {PHAP_BAO_MAIN_DO.map((r) => (
                    <tr key={r.stage}>
                      <td className="py-2.5 px-4 font-medium text-slate-200">{r.stage}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-300">{r.soTuDetail}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-sky-300">{r.kinhThi}</td>
                    </tr>
                  ))}
                  <tr className="bg-red-500/10 font-bold">
                    <td className="py-3 px-4 text-red-200">Tổng Thần Rèn</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-300">144</td>
                    <td className="py-3 px-4 text-right font-mono text-sky-300">72</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Phap bao main kim */}
            <div className="rounded-2xl border border-yellow-500/25 bg-[#121722]/90 overflow-hidden">
              <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-yellow-500/8 flex justify-between items-center">
                <h2 className="font-semibold text-white">Pháp Bảo Main Kim (Thánh Luyện)</h2>
                <span className="text-xs text-yellow-300 font-semibold">3 Giai đoạn</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                    <th className="py-2.5 px-4">Giai đoạn</th>
                    <th className="py-2.5 px-3 text-right">Sở từ</th>
                    <th className="py-2.5 px-3 text-right">Kinh thi</th>
                    <th className="py-2.5 px-4 text-right">Phôi kim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {PHAP_BAO_MAIN_KIM.map((r) => (
                    <tr key={r.stage}>
                      <td className="py-2.5 px-4 font-medium text-slate-200">{r.stage}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-300">{r.soTu}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-sky-300">{r.kinhThi}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-300">{r.phoiKim}</td>
                    </tr>
                  ))}
                  <tr className="bg-yellow-500/10 font-bold">
                    <td className="py-3 px-4 text-yellow-200">Tổng Thánh Luyện</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-300">360</td>
                    <td className="py-3 px-3 text-right font-mono text-sky-300">180</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-300">300</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-bold text-amber-200">TỔNG CỘNG PHÁP BẢO MAIN (Thần Rèn + Thánh Luyện)</span>
            <div className="flex flex-wrap gap-4 font-mono text-sm">
              <span>Sở từ: <strong className="text-amber-300">504</strong></span>
              <span>Kinh thi: <strong className="text-sky-300">252</strong></span>
              <span>Phôi kim: <strong className="text-emerald-300">300</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* 3. MO HINH */}
      {selectedResource === 'mo-hinh' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="font-semibold text-white">Nâng Cấp Mô Hình</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng: 24 Pháo Hoa Kịch Trường</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                  <th className="py-2.5 px-4">Cấp độ nâng cấp</th>
                  <th className="py-2.5 px-4 text-right">Pháo Hoa Kịch Trường</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {MO_HINH_TIERS.map((r, i) => (
                  <tr
                    key={r.level}
                    className={i >= mhRange[0] && i <= mhRange[1] ? 'bg-amber-500/[0.06]' : ''}
                  >
                    <td className="py-2.5 px-4 font-medium text-slate-200">{r.level}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-amber-300">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-5 space-y-4 self-start">
            <div className="font-semibold text-amber-300 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tính Pháo Hoa Kịch Trường
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Từ bậc</label>
                <select
                  value={mhRange[0]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setMhRange([v, Math.max(v, mhRange[1])]);
                  }}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-xs text-white"
                >
                  {MO_HINH_TIERS.map((r, i) => (
                    <option key={r.level} value={i}>{r.level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Đến bậc</label>
                <select
                  value={mhRange[1]}
                  onChange={(e) => setMhRange([mhRange[0], Number(e.target.value)])}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-xs text-white"
                >
                  {MO_HINH_TIERS.map((r, i) => (
                    <option key={r.level} value={i} disabled={i < mhRange[0]}>{r.level}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rounded-xl bg-black/40 border border-amber-500/20 p-4 text-center">
              <div className="text-xs text-slate-400">Tổng Pháo Hoa Kịch Trường cần</div>
              <div className="text-3xl font-bold text-amber-400 font-mono mt-1">{mhTotal}</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LUC AN */}
      {selectedResource === 'luc-an' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="font-semibold text-white">Nâng Sao Lục Ấn</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng: 1,200 Mảnh</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                  <th className="py-2.5 px-4">Cấp Sao</th>
                  <th className="py-2.5 px-4 text-right">Số Lượng Mảnh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {LUC_AN_TIERS.map((r, i) => (
                  <tr
                    key={r.star}
                    className={i >= laRange[0] && i <= laRange[1] ? 'bg-amber-500/[0.06]' : ''}
                  >
                    <td className="py-2.5 px-4 font-semibold text-amber-300">{r.star}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-white">{r.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-5 space-y-4 self-start">
            <div className="font-semibold text-amber-300 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tính Mảnh Lục Ấn
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Từ mốc</label>
                <select
                  value={laRange[0]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setLaRange([v, Math.max(v, laRange[1])]);
                  }}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                >
                  {LUC_AN_TIERS.map((r, i) => (
                    <option key={r.star} value={i}>{r.star}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Đến mốc</label>
                <select
                  value={laRange[1]}
                  onChange={(e) => setLaRange([laRange[0], Number(e.target.value)])}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                >
                  {LUC_AN_TIERS.map((r, i) => (
                    <option key={r.star} value={i} disabled={i < laRange[0]}>{r.star}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rounded-xl bg-black/40 border border-amber-500/20 p-4 text-center">
              <div className="text-xs text-slate-400">Tổng số mảnh cần</div>
              <div className="text-3xl font-bold text-amber-400 font-mono mt-1">{laTotal.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. LINH KY */}
      {selectedResource === 'linh-ky' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="font-semibold text-white">Nâng Cấp Linh Kỵ</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng: 720 Mảnh • 14 Ngọc</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                  <th className="py-2.5 px-4">Giai Đoạn</th>
                  <th className="py-2.5 px-3">Mảnh Linh Kỵ</th>
                  <th className="py-2.5 px-4 text-right">Huyền Tiêu Thần Ngọc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {LINH_KY_TIERS.map((r, i) => (
                  <tr
                    key={r.stage}
                    className={i >= lkRange[0] && i <= lkRange[1] ? 'bg-amber-500/[0.06]' : ''}
                  >
                    <td className="py-2.5 px-4 font-semibold text-amber-300">{r.stage}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-200">{r.detail}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-300">
                      {r.ngoc === 0 ? 'Không' : r.ngoc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-5 space-y-4 self-start">
            <div className="font-semibold text-amber-300 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tính Nguyên Liệu Linh Kỵ
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Từ giai đoạn</label>
                <select
                  value={lkRange[0]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setLkRange([v, Math.max(v, lkRange[1])]);
                  }}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                >
                  {LINH_KY_TIERS.map((r, i) => (
                    <option key={r.stage} value={i}>{r.stage}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Đến giai đoạn</label>
                <select
                  value={lkRange[1]}
                  onChange={(e) => setLkRange([lkRange[0], Number(e.target.value)])}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                >
                  {LINH_KY_TIERS.map((r, i) => (
                    <option key={r.stage} value={i} disabled={i < lkRange[0]}>{r.stage}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/40 border border-amber-500/20 p-3.5 text-center">
                <div className="text-xs text-slate-400">Mảnh Linh Kỵ</div>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{lkTotal.shards}</div>
              </div>
              <div className="rounded-xl bg-black/40 border border-emerald-500/20 p-3.5 text-center">
                <div className="text-xs text-slate-400">Huyền Tiêu Thần Ngọc</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{lkTotal.ngoc}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TIEN TANG */}
      {selectedResource === 'tien-tang' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="font-semibold text-white">Nâng Sao & Thức Tỉnh Tiên Tàng</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng: 2,560 Mảnh • 5 Viên</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                  <th className="py-2.5 px-4">Cấp / Sao</th>
                  <th className="py-2.5 px-3 text-right">Số Lượng Mảnh</th>
                  <th className="py-2.5 px-4 text-right">Khải Linh Thạch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {TIEN_TANG_TIERS.map((r, i) => (
                  <tr
                    key={r.star}
                    className={i >= ttRange[0] && i <= ttRange[1] ? 'bg-amber-500/[0.06]' : ''}
                  >
                    <td className={`py-2.5 px-4 font-medium ${r.phase === 'thuc-tinh' ? 'text-rose-300' : 'text-amber-200'}`}>
                      {r.star}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-white">{r.shards} Mảnh</td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-300">
                      {r.thach > 0 ? `${r.thach} Viên` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-amber-500/8 border-t border-amber-500/20 text-xs text-amber-200">
              💡 Nâng Sao (Bản Thể → 5s): <strong>1,760 Mảnh</strong> • Thức Tỉnh Đỏ (6s → 10s): <strong>800 Mảnh + 5 Khải Linh Thạch</strong>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-5 space-y-4 self-start">
            <div className="font-semibold text-amber-300 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tính Nguyên Liệu Tiên Tàng
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Từ mốc</label>
                <select
                  value={ttRange[0]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setTtRange([v, Math.max(v, ttRange[1])]);
                  }}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-xs text-white"
                >
                  {TIEN_TANG_TIERS.map((r, i) => (
                    <option key={r.star} value={i}>{r.star}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Đến mốc</label>
                <select
                  value={ttRange[1]}
                  onChange={(e) => setTtRange([ttRange[0], Number(e.target.value)])}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-xs text-white"
                >
                  {TIEN_TANG_TIERS.map((r, i) => (
                    <option key={r.star} value={i} disabled={i < ttRange[0]}>{r.star}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/40 border border-amber-500/20 p-3.5 text-center">
                <div className="text-xs text-slate-400">Tổng Mảnh</div>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                  {ttTotal.shards.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-black/40 border border-emerald-500/20 p-3.5 text-center">
                <div className="text-xs text-slate-400">Khải Linh Thạch</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{ttTotal.thach} Viên</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. TINH HON */}
      {selectedResource === 'tinh-hon' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h2 className="font-semibold text-white">Thức Tỉnh Tinh Hồn</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng: 20 Tinh phách • 10 Chú Hồn Nghi</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                  <th className="py-2.5 px-4">Tiến Trình Thức Tỉnh</th>
                  <th className="py-2.5 px-3 text-right">Tinh phách đỏ bất kỳ</th>
                  <th className="py-2.5 px-4 text-right">Chú Hồn Nghi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {TINH_HON_TIERS.map((r, i) => (
                  <tr
                    key={r.stage}
                    className={i >= thRange[0] && i <= thRange[1] ? 'bg-amber-500/[0.06]' : ''}
                  >
                    <td className="py-2.5 px-4 font-semibold text-amber-200">{r.stage}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-300">{r.tinhPhach}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-sky-300">{r.chuHonNghi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#121722]/95 p-5 space-y-4 self-start">
            <div className="font-semibold text-amber-300 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tính Nguyên Liệu Tinh Hồn
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Từ mốc</label>
                <select
                  value={thRange[0]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setThRange([v, Math.max(v, thRange[1])]);
                  }}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-xs text-white"
                >
                  {TINH_HON_TIERS.map((r, i) => (
                    <option key={r.stage} value={i}>{r.stage}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Đến mốc</label>
                <select
                  value={thRange[1]}
                  onChange={(e) => setThRange([thRange[0], Number(e.target.value)])}
                  className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-xs text-white"
                >
                  {TINH_HON_TIERS.map((r, i) => (
                    <option key={r.stage} value={i} disabled={i < thRange[0]}>{r.stage}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/40 border border-rose-500/20 p-3.5 text-center">
                <div className="text-xs text-slate-400">Tinh phách đỏ</div>
                <div className="text-2xl font-bold text-rose-400 font-mono mt-1">{thTotal.tinhPhach}</div>
              </div>
              <div className="rounded-xl bg-black/40 border border-sky-500/20 p-3.5 text-center">
                <div className="text-xs text-slate-400">Chú Hồn Nghi</div>
                <div className="text-2xl font-bold text-sky-400 font-mono mt-1">{thTotal.chuHonNghi}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. CHIEN LINH */}
      {selectedResource === 'chien-linh' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex flex-wrap justify-between items-center gap-2">
              <h2 className="font-semibold text-white">Nâng Cấp Chiến Linh (Mệnh Tinh & Tinh Trận)</h2>
              <span className="text-xs text-amber-300 font-semibold">Tổng toàn bộ: 1,680 Mảnh</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/25">
                    <th className="py-2.5 px-4">Mệnh Tinh</th>
                    <th className="py-2.5 px-3 text-right">Mảnh Mệnh Tinh</th>
                    <th className="py-2.5 px-4">Tinh Trận</th>
                    <th className="py-2.5 px-4 text-right">Mảnh Tinh Trận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {CHIEN_LINH_TIERS.map((r) => (
                    <tr key={r.menhTinh} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-4 font-semibold text-amber-300">{r.menhTinh}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-white">{r.mtShards} Mảnh</td>
                      <td className="py-2.5 px-4 font-medium text-sky-300">{r.tinhTran}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-300">{r.ttDetail}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-500/10 font-bold">
                    <td className="py-3 px-4 text-amber-200">Tổng Mệnh Tinh</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-300">720 Mảnh</td>
                    <td className="py-3 px-4 text-sky-200">Tổng Tinh Trận</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-300">960 Mảnh</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-emerald-500/10 border-t border-emerald-500/20 text-xs sm:text-sm text-emerald-200 font-semibold">
              TỔNG CỘNG TOÀN BỘ CHIẾN LINH: 720 + 960 = 1,680 Mảnh
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
