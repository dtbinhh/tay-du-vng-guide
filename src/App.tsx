import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  CalendarDays,
  CheckCircle2,
  Cloud,
  RefreshCw,
  Search,
  Sparkles,
  Swords,
  X,
} from 'lucide-react';
import { DashboardEvents } from './components/DashboardEvents';
import { HeroUpgrades, type ResourceTabKey } from './components/HeroUpgrades';
import { EventCalculators, type EventTabKey } from './components/EventCalculators';
import { Lightbox, type LightboxImage } from './components/Lightbox';
import {
  DOI_QUYET_RANKS,
  EVENT_HISTORY,
  HERO_UPGRADE_CATEGORIES,
  LAM_LANG_EVENTS,
  THIEN_KY_GROUPS,
} from './data/gameData';
import {
  fetchSheetSync,
  getConfiguredApiUrl,
  getScheduledSyncSlots,
  getSyncCooldownRemaining,
  isSlotSyncDue,
  loadCachedSync,
  saveAdminPin,
  type SyncedPayload,
} from './services/sheetSync';

type TabId = 'events' | 'heroes' | 'calculators';

const NAV_ITEMS: { id: TabId; label: string; shortLabel: string; icon: typeof CalendarDays }[] = [
  { id: 'events', label: 'Lịch & Dự Đoán Sự Kiện', shortLabel: 'Lịch SK', icon: CalendarDays },
  { id: 'heroes', label: 'Tài Nguyên Nâng Cấp', shortLabel: 'Tài Nguyên', icon: Swords },
  { id: 'calculators', label: 'Tổng Hợp Sự Kiện', shortLabel: 'Sự Kiện', icon: Calculator },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('events');
  const [selectedResource, setSelectedResource] = useState<ResourceTabKey>('tuong');
  const [selectedEvent, setSelectedEvent] = useState<EventTabKey>('hoan-tu');
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  // Google Sheet Auto-Sync state
  const [synced, setSynced] = useState<SyncedPayload | null>(() => loadCachedSync());
  const [syncing, setSyncing] = useState(false);
  const [syncCooldownSec, setSyncCooldownSec] = useState(() =>
    Math.ceil(getSyncCooldownRemaining() / 1000)
  );
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');

  useEffect(() => {
    if (syncCooldownSec <= 0) return;
    const t = setInterval(() => {
      setSyncCooldownSec(Math.ceil(getSyncCooldownRemaining() / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [syncCooldownSec]);

  const runSync = useCallback(
    async (overrideUrl?: string, manual = false, pin?: string): Promise<boolean> => {
      const targetUrl = (overrideUrl ?? getConfiguredApiUrl()).trim();
      if (!targetUrl) return false;
      setSyncing(true);
      setSyncError(null);
      try {
        const payload = await fetchSheetSync(targetUrl, { manual, pin });
        setSynced(payload);
        if (manual) {
          setSyncCooldownSec(Math.ceil(getSyncCooldownRemaining() / 1000));
        }
        return true;
      } catch (err) {
        setSyncError(err instanceof Error ? err.message : String(err));
        return false;
      } finally {
        setSyncing(false);
      }
    },
    []
  );

  const [nextAutoSyncLabel, setNextAutoSyncLabel] = useState(
    () => getScheduledSyncSlots().nextSlotLabel
  );

  // Scheduled auto-sync every 2 hours starting from 04:00 UTC+7
  // Does NOT spam on page reload — only syncs once per 2-hour slot.
  useEffect(() => {
    if (!getConfiguredApiUrl()) return;

    let timerId: ReturnType<typeof setTimeout> | undefined;

    const scheduleNext = () => {
      const { msUntilNextSlot, nextSlotLabel } = getScheduledSyncSlots();
      setNextAutoSyncLabel(nextSlotLabel);
      timerId = setTimeout(async () => {
        await runSync(undefined, false);
        scheduleNext();
      }, msUntilNextSlot + 500);
    };

    const cached = loadCachedSync();
    if (isSlotSyncDue(cached?.updatedAt)) {
      runSync(undefined, false);
    }
    scheduleNext();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [runSync]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSyncModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const currentEvents = synced?.events && synced.events.length > 0 ? synced.events : EVENT_HISTORY;

  const searchResults = useMemo(() => {
    const q = globalQuery.trim().toLowerCase();
    if (!q) return [];
    const results: {
      title: string;
      subtitle: string;
      tab: TabId;
      eventKey?: EventTabKey;
      resourceKey?: ResourceTabKey;
      badge: string;
    }[] = [];

    for (const ev of currentEvents) {
      if (ev.name.toLowerCase().includes(q)) {
        results.push({
          title: ev.name,
          subtitle: `${ev.rounds.length} đợt ghi nhận`,
          tab: 'events',
          badge: 'Lịch SK',
        });
      }
    }
    for (const cat of HERO_UPGRADE_CATEGORIES) {
      if (cat.name.toLowerCase().includes(q) || cat.summaryNote?.toLowerCase().includes(q)) {
        results.push({
          title: cat.name,
          subtitle: cat.summaryNote || `${cat.rows.length} mốc sao`,
          tab: 'heroes',
          resourceKey: 'tuong',
          badge: 'Tài Nguyên',
        });
      }
    }
    const quickResources: { key: ResourceTabKey; title: string; subtitle: string; keywords: string }[] = [
      { key: 'thien-ky', title: 'Thiên Kỹ & Thần Kích', subtitle: 'Thiên kỹ Cam/Đỏ & các loại Thần kích 1s–6s', keywords: 'thien ky than kich tinh hoa thien ky' },
      { key: 'phap-bao', title: 'Pháp Bảo & Pháp Bảo Main', subtitle: 'Thần Rèn (Đỏ) & Thánh Luyện (Kim)', keywords: 'phap bao than ren thanh luyen so tu kinh thi phoi kim' },
      { key: 'mo-hinh', title: 'Mô Hình', subtitle: 'Cấp 0 → 10 • Tổng 24 Pháo Hoa Kịch Trường', keywords: 'mo hinh phao hoa kich truong' },
      { key: 'luc-an', title: 'Lục Ấn', subtitle: '0 → 5 Sao • Tổng 1,200 Mảnh', keywords: 'luc an manh sao' },
      { key: 'linh-ky', title: 'Linh Kỵ', subtitle: 'Tổng 720 Mảnh • 14 Huyền Tiêu Thần Ngọc', keywords: 'linh ky huyen tieu than ngoc tich nguyen uan linh thoat bien hien thanh' },
      { key: 'tien-tang', title: 'Tiên Tàng', subtitle: 'Tổng 2,560 Mảnh • 5 Khải Linh Thạch', keywords: 'tien tang khai linh thach thuc tinh do' },
      { key: 'tinh-hon', title: 'Tinh Hồn', subtitle: 'Tổng 20 Tinh phách đỏ • 10 Chú Hồn Nghi', keywords: 'tinh hon tinh phach chu hon nghi' },
      { key: 'chien-linh', title: 'Chiến Linh', subtitle: 'Mệnh Tinh 720 + Tinh Trận 960 = 1,680 Mảnh', keywords: 'chien linh menh tinh tinh tran' },
    ];
    for (const qr of quickResources) {
      if (qr.title.toLowerCase().includes(q) || qr.keywords.includes(q)) {
        results.push({
          title: qr.title,
          subtitle: qr.subtitle,
          tab: 'heroes',
          resourceKey: qr.key,
          badge: 'Tài Nguyên',
        });
      }
    }
    for (const g of THIEN_KY_GROUPS) {
      if (g.skillNames.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)) {
        results.push({
          title: g.skillNames,
          subtitle: g.category,
          tab: 'heroes',
          resourceKey: 'thien-ky',
          badge: 'Thiên Kỹ',
        });
      }
    }
    for (const ll of LAM_LANG_EVENTS) {
      for (const f of ll.floors) {
        if (
          ll.title.toLowerCase().includes(q) ||
          f.item1.toLowerCase().includes(q) ||
          f.item2.toLowerCase().includes(q) ||
          f.item3.toLowerCase().includes(q)
        ) {
          results.push({
            title: `${ll.title} • ${f.floor}`,
            subtitle: `${f.item1} | ${f.item2} | ${f.item3}`,
            tab: 'calculators',
            eventKey: 'lam-lang',
            badge: 'Lâm Lang',
          });
        }
      }
    }
    for (const r of DOI_QUYET_RANKS) {
      if (r.rank.toLowerCase().includes(q) || r.rankReward.toLowerCase().includes(q)) {
        results.push({
          title: `Đối Quyết: Rank ${r.rank}`,
          subtitle: `${r.rankReward} • ${r.points}đ`,
          tab: 'calculators',
          eventKey: 'doi-quyet',
          badge: 'Đối Quyết',
        });
      }
    }
    const quickEvents: { key: EventTabKey; title: string; keywords: string }[] = [
      { key: 'hoan-tu', title: 'Hoan Tụ Kim Tiêu', keywords: 'hoan tu kim tieu anh dang bao thi ve' },
      { key: 'kim-tuong', title: 'Quay Kim Tướng', keywords: 'kim tuong ve manh' },
      { key: 'tich-xa', title: 'Tích Xả', keywords: 'tich xa thien giac hoan luoi bat ma' },
      { key: 'ho-du', title: 'Hồ Du Tân Viên', keywords: 'ho du tan vien hoa dang lien hoa du long' },
      { key: 'manh-ha', title: 'Mạnh Hạ Hoan Ca', keywords: 'manh ha hoan ca hoan tra sat canh' },
      { key: 'con-lon', title: 'Côn Lôn Tiên Cảnh', keywords: 'con lon tien canh u lan than moc tien tuy' },
      { key: 'chieu-tai', title: 'Chiêu Tài', keywords: 'chieu tai trau tim ho cam su cam' },
      { key: 'that-tich', title: 'Thất Tịch', keywords: 'that tich diem danh' },
      { key: 'sinh-nhat', title: 'Ev Sinh Nhật', keywords: 'sinh nhat tran yeu do skin' },
      { key: 'cuu-u', title: 'Cửu U (11 ảnh)', keywords: 'cuu u mua 1 ban do map' },
    ];
    for (const qe of quickEvents) {
      if (qe.title.toLowerCase().includes(q) || qe.keywords.includes(q)) {
        results.push({
          title: qe.title,
          subtitle: 'Mở trong Tổng Hợp Sự Kiện',
          tab: 'calculators',
          eventKey: qe.key,
          badge: 'Sự Kiện',
        });
      }
    }

    return results.slice(0, 15);
  }, [globalQuery, currentEvents]);

  function openImage(images: LightboxImage[], index: number) {
    setLightbox({ images, index });
  }

  async function handleSaveSyncSettings(e: React.FormEvent) {
    e.preventDefault();
    const cleanPin = pinInput.trim();
    if (!cleanPin) {
      setSyncError('Vui lòng nhập mã PIN để thực hiện đồng bộ.');
      return;
    }
    saveAdminPin(cleanPin);
    const ok = await runSync(undefined, true, cleanPin);
    if (ok) {
      setPinInput('');
    }
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-68 lg:shrink-0 border-r border-white/10 bg-[#0d111a]/95 sticky top-0 h-dvh">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-white leading-tight">Tây Du VNG</div>
              <div className="text-xs text-amber-400 font-medium">Cẩm Nang Tra Cứu</div>
            </div>
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className="mt-4 w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#151b29] border border-white/10 hover:border-amber-500/40 text-xs text-slate-400 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              Tra cứu nhanh...
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-slate-400">Ctrl K</kbd>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0d111a]/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-white leading-none">Tây Du VNG</div>
            <div className="text-[11px] text-amber-400">Cẩm Nang Tra Cứu</div>
          </div>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200"
          aria-label="Tìm kiếm"
        >
          <Search className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-24 lg:pb-10 max-w-7xl w-full mx-auto">
        {activeTab === 'events' && (
          <DashboardEvents
            syncedEvents={synced?.events}
            syncing={syncing}
            syncCooldownSec={syncCooldownSec}
            lastSyncedAt={synced?.updatedAt}
            nextAutoSyncLabel={nextAutoSyncLabel}
            onRefreshSync={() => {
              setSyncError(null);
              setPinInput('');
              setSyncModalOpen(true);
            }}
            onOpenSyncModal={() => {
              setSyncError(null);
              setPinInput('');
              setSyncModalOpen(true);
            }}
          />
        )}
        {activeTab === 'heroes' && (
          <HeroUpgrades
            selectedResource={selectedResource}
            onSelectResource={setSelectedResource}
          />
        )}
        {activeTab === 'calculators' && (
          <EventCalculators
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
            onOpenImage={openImage}
            syncedHoanTu={synced?.hoanTuKimTieu}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0d111a]/95 backdrop-blur-md border-t border-white/10 pb-safe">
        <div className="grid grid-cols-3 px-1 pt-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition ${
                  isActive ? 'text-amber-400' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-semibold truncate max-w-full px-1">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sync Settings Modal */}
      {syncModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSyncModalOpen(false)}
        >
          <form
            onSubmit={handleSaveSyncSettings}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-amber-500/30 bg-[#121722] p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Cloud className="w-5 h-5 text-amber-400" />
                Tự Động Đồng Bộ Dữ Liệu
              </div>
              <button
                type="button"
                onClick={() => setSyncModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Nhập <strong>Mã PIN</strong> để làm mới dữ liệu trực tiếp.
            </p>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Mã PIN đồng bộ *</label>
              <input
                type="password"
                autoFocus
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mã PIN quản trị..."
                className="w-full rounded-xl bg-[#0b0e14] border border-amber-500/40 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {syncError && (
              <div className="text-xs px-3 py-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300">
                {syncError}
              </div>
            )}
            {synced?.updatedAt && !syncError && (
              <div className="text-xs px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Đã đồng bộ thành công lúc {new Date(synced.updatedAt).toLocaleString('vi-VN')}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSyncModalOpen(false)}
                className="px-3.5 py-2 rounded-xl bg-white/5 text-slate-300 text-sm cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="submit"
                disabled={syncing || syncCooldownSec > 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing
                  ? 'Đang đồng bộ...'
                  : syncCooldownSec > 0
                  ? `Đợi ${syncCooldownSec}s`
                  : 'Xác nhận & Đồng bộ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-amber-500/30 bg-[#121722] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Tìm sự kiện, Hoan Tụ Kim Tiêu, Lâm Lang, Thiên Kỹ..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-white/6">
              {globalQuery.trim() === '' ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  Nhập từ khóa bất kỳ (ví dụ: <em>Hoan Tụ Kim Tiêu</em>, <em>Thiên Kỹ</em>, <em>Thần Ma</em>, <em>Lâm Lang</em>...)
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  Không tìm thấy kết quả cho &ldquo;{globalQuery}&rdquo;
                </div>
              ) : (
                searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(r.tab);
                      if (r.eventKey) setSelectedEvent(r.eventKey);
                      if (r.resourceKey) setSelectedResource(r.resourceKey);
                      setSearchOpen(false);
                      setGlobalQuery('');
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{r.title}</div>
                      <div className="text-xs text-slate-400 truncate">{r.subtitle}</div>
                    </div>
                    <span className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                      {r.badge}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <Lightbox
        images={lightbox?.images ?? []}
        index={lightbox?.index ?? null}
        onClose={() => setLightbox(null)}
        onChangeIndex={(idx) => setLightbox((prev) => (prev ? { ...prev, index: idx } : null))}
      />
    </div>
  );
}
