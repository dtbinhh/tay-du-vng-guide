import { useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  Flame,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { EVENT_HISTORY, type TrackedEvent } from '../data/gameData';

const STORAGE_KEY = 'tdvng_custom_events_v1';

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function getTodayDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function formatVNDate(iso: string): string {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function addDaysISO(iso: string, days: number): string {
  const dt = parseISODate(iso);
  dt.setDate(dt.getDate() + days);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function DashboardEvents() {
  const [events, setEvents] = useState<TrackedEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return EVENT_HISTORY;
  });

  const [query, setQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState(EVENT_HISTORY[0]?.name || '');
  const [customName, setCustomName] = useState('');
  const [newStart, setNewStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [newEnd, setNewEnd] = useState(() => new Date().toISOString().slice(0, 10));

  const today = useMemo(() => getTodayDate(), []);

  // Flatten all rounds & compute status matching the Google Sheet formula
  const recentEvents = useMemo(() => {
    const flat: {
      name: string;
      round: number;
      start: string;
      end: string;
      status: string;
      kind: 'active' | 'upcoming' | 'ended';
      dist: number;
    }[] = [];

    for (const ev of events) {
      for (const r of ev.rounds) {
        const s = parseISODate(r.start);
        const e = parseISODate(r.end || r.start);
        let dist = 0;
        let status = '';
        let kind: 'active' | 'upcoming' | 'ended' = 'ended';

        if (today < s) {
          dist = diffDays(s, today);
          kind = 'upcoming';
          status = dist === 1 ? 'Sắp diễn ra (ngày mai)' : `Sắp diễn ra (còn ${dist} ngày)`;
        } else if (today > e) {
          dist = diffDays(today, e);
          kind = 'ended';
          status = dist === 1 ? 'Đã kết thúc (hôm qua)' : `Đã kết thúc (${dist} ngày trước)`;
        } else {
          dist = 0;
          kind = 'active';
          const rem = diffDays(e, today);
          status = rem === 0 ? 'Đang diễn ra (hôm nay kết thúc)' : `Đang diễn ra (còn ${rem + 1} ngày)`;
        }

        flat.push({ name: ev.name, round: r.round, start: r.start, end: r.end, status, kind, dist });
      }
    }

    flat.sort((a, b) => a.dist - b.dist || b.start.localeCompare(a.start));
    return flat.slice(0, 8);
  }, [events, today]);

  // Predictions for events with >= 2 recorded rounds
  const predictions = useMemo(() => {
    const list: {
      name: string;
      count: number;
      lastStart: string;
      avgCycle: number;
      nextDate: string;
      diff: number;
      status: string;
    }[] = [];

    for (const ev of events) {
      if (ev.rounds.length < 2) continue;
      const sorted = [...ev.rounds].sort((a, b) => a.start.localeCompare(b.start));
      const first = parseISODate(sorted[0].start);
      const last = parseISODate(sorted[sorted.length - 1].start);
      const avgCycle = diffDays(last, first) / (sorted.length - 1);
      const nextDate = addDaysISO(sorted[sorted.length - 1].start, Math.round(avgCycle));
      const diff = diffDays(parseISODate(nextDate), today);
      let status = '';
      if (diff < 0) status = `Quá hạn ${Math.abs(diff)} ngày`;
      else if (diff === 0) status = 'Dự kiến hôm nay';
      else if (diff === 1) status = 'Dự kiến ngày mai';
      else status = `Dự kiến còn ${diff} ngày`;

      list.push({
        name: ev.name,
        count: sorted.length,
        lastStart: sorted[sorted.length - 1].start,
        avgCycle: Number(avgCycle.toFixed(1)),
        nextDate,
        diff,
        status,
      });
    }

    return list.sort((a, b) => a.diff - b.diff);
  }, [events, today]);

  const filteredAllEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((ev) => ev.name.toLowerCase().includes(q));
  }, [events, query]);

  const activeCount = recentEvents.filter((e) => e.kind === 'active').length;
  const dueSoonCount = predictions.filter((p) => p.diff <= 7).length;

  function handleAddRound(e: React.FormEvent) {
    e.preventDefault();
    const targetName = (newName === '__custom__' ? customName : newName).trim();
    if (!targetName || !newStart) return;
    const updated = [...events];
    const idx = updated.findIndex((ev) => ev.name.toLowerCase() === targetName.toLowerCase());
    if (idx >= 0) {
      const rounds = [
        ...updated[idx].rounds,
        { round: updated[idx].rounds.length + 1, start: newStart, end: newEnd || newStart },
      ].sort((a, b) => a.start.localeCompare(b.start));
      updated[idx] = { ...updated[idx], rounds };
    } else {
      updated.unshift({
        name: targetName,
        rounds: [{ round: 1, start: newStart, end: newEnd || newStart }],
      });
    }
    setEvents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowAddForm(false);
    setCustomName('');
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
    setEvents(EVENT_HISTORY);
  }

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#161c2c] via-[#121722] to-[#1a1410] p-5 sm:p-6">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Cẩm Nang Tây Du VNG
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Theo Dõi & Dự Đoán Sự Kiện
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Tự động tính trạng thái sự kiện theo ngày hôm nay ({formatVNDate(today.toISOString().slice(0, 10))}) và dự đoán chu kỳ quay lại.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddForm((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Ghi nhận đợt mới
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm transition cursor-pointer"
              title="Khôi phục dữ liệu gốc từ Google Sheet"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Gốc</span>
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="rounded-xl bg-black/30 border border-white/8 p-3.5">
            <div className="text-xs text-slate-400">Đang diễn ra</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">{activeCount}</div>
          </div>
          <div className="rounded-xl bg-black/30 border border-white/8 p-3.5">
            <div className="text-xs text-slate-400">Sắp tới / Quá hạn (≤7 ngày)</div>
            <div className="text-2xl font-bold text-amber-400 mt-0.5">{dueSoonCount}</div>
          </div>
          <div className="rounded-xl bg-black/30 border border-white/8 p-3.5">
            <div className="text-xs text-slate-400">Tổng sự kiện theo dõi</div>
            <div className="text-2xl font-bold text-sky-400 mt-0.5">{events.length}</div>
          </div>
          <div className="rounded-xl bg-black/30 border border-white/8 p-3.5">
            <div className="text-xs text-slate-400">Sự kiện có chu kỳ</div>
            <div className="text-2xl font-bold text-purple-400 mt-0.5">{predictions.length}</div>
          </div>
        </div>
      </div>

      {/* Add Round Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddRound}
          className="rounded-2xl border border-amber-500/30 bg-[#141a27] p-4 sm:p-5 space-y-4"
        >
          <div className="font-semibold text-amber-300 text-sm">
            Thêm đợt sự kiện mới (lưu trên trình duyệt này)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Tên sự kiện</label>
              <select
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
              >
                {events.map((ev) => (
                  <option key={ev.name} value={ev.name}>
                    {ev.name}
                  </option>
                ))}
                <option value="__custom__">+ Nhập sự kiện mới...</option>
              </select>
              {newName === '__custom__' && (
                <input
                  type="text"
                  placeholder="Tên sự kiện mới..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                  required
                />
              )}
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ngày bắt đầu</label>
              <input
                type="date"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
                className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ngày kết thúc</label>
              <input
                type="date"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
                className="w-full rounded-xl bg-[#0b0e14] border border-white/15 px-3 py-2 text-sm text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-2 rounded-xl bg-white/5 text-slate-300 text-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-semibold text-sm cursor-pointer"
            >
              Lưu đợt sự kiện
            </button>
          </div>
        </form>
      )}

      {/* Main 2-column grid on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Recent Events */}
        <section className="xl:col-span-5 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <Flame className="w-4 h-4 text-amber-400" />
            <h2 className="font-semibold text-white text-sm sm:text-base">
              Sự Kiện Gần Nhất
            </h2>
          </div>
          <div className="divide-y divide-white/6">
            {recentEvents.map((ev, i) => (
              <div key={`${ev.name}-${ev.round}-${i}`} className="p-3.5 sm:px-5 hover:bg-white/[0.02] transition">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-slate-100 leading-snug">{ev.name}</div>
                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-white/8 text-slate-300 whitespace-nowrap">Lần {ev.round}</span>
                      <span className="whitespace-nowrap">
                        {formatVNDate(ev.start)} → {formatVNDate(ev.end)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`self-start shrink-0 whitespace-nowrap text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      ev.kind === 'active'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : ev.kind === 'upcoming'
                        ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                        : 'bg-slate-500/15 text-slate-300 border-slate-500/25'
                    }`}
                  >
                    {ev.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Predictions */}
        <section className="xl:col-span-7 rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="font-semibold text-white text-sm sm:text-base">
                Dự Đoán Chu Kỳ Sự Kiện
              </h2>
            </div>
            <span className="text-xs text-slate-400">{predictions.length} sự kiện có chu kỳ</span>
          </div>

          {/* Desktop table / Mobile cards */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-white/8 bg-black/20">
                  <th className="py-2.5 px-4 font-medium">Sự kiện</th>
                  <th className="py-2.5 px-3 font-medium text-center">Lần</th>
                  <th className="py-2.5 px-3 font-medium">Gần nhất</th>
                  <th className="py-2.5 px-3 font-medium">Chu kỳ TB</th>
                  <th className="py-2.5 px-3 font-medium">Dự kiến</th>
                  <th className="py-2.5 px-4 font-medium text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {predictions.map((p) => (
                  <tr key={p.name} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-medium text-slate-100">{p.name}</td>
                    <td className="py-3 px-3 text-center text-slate-300">{p.count}</td>
                    <td className="py-3 px-3 text-slate-300">{formatVNDate(p.lastStart)}</td>
                    <td className="py-3 px-3 text-amber-300 font-medium">{p.avgCycle} ngày</td>
                    <td className="py-3 px-3 text-slate-200">{formatVNDate(p.nextDate)}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span
                        className={`inline-block whitespace-nowrap text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                          p.diff < 0
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : p.diff <= 3
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y divide-white/8">
            {predictions.map((p) => (
              <div key={p.name} className="p-3.5 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-sm text-slate-100">{p.name}</div>
                  <span
                    className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      p.diff < 0
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : p.diff <= 3
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span>Chu kỳ: <strong className="text-amber-300">{p.avgCycle} ngày</strong></span>
                  <span>Gần nhất: {formatVNDate(p.lastStart)}</span>
                  <span>Dự kiến: <strong className="text-slate-200">{formatVNDate(p.nextDate)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Full History of all 26 events */}
      <section className="rounded-2xl border border-white/10 bg-[#121722]/90 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <h2 className="font-semibold text-white text-sm sm:text-base">
              Lịch Sử Toàn Bộ Sự Kiện ({filteredAllEvents.length})
            </h2>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lọc tên sự kiện..."
              className="w-full rounded-xl bg-[#0b0e14] border border-white/12 pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAllEvents.map((ev) => (
            <div
              key={ev.name}
              className="rounded-xl border border-white/8 bg-[#0e131d] p-3.5 hover:border-amber-500/30 transition"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm text-amber-200 truncate">{ev.name}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/8 text-slate-300 shrink-0">
                  {ev.rounds.length} đợt
                </span>
              </div>
              <div className="space-y-1">
                {ev.rounds.map((r) => (
                  <div key={r.round} className="flex items-center justify-between text-xs text-slate-300">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Lần {r.round}
                    </span>
                    <span className="font-mono text-[11px]">
                      {formatVNDate(r.start)} – {formatVNDate(r.end)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
