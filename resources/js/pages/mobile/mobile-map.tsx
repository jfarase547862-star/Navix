import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { AppHeader } from '@/components/mobile/AppHeader';
import { Footer } from '@/components/mobile/Footer';
import { MapLibreFloorMap, indoorRooms, CITY_HALL_NAME } from '@/components/maplibre-floor-map';
import { seedOffices, getOffice, seedFloorMaps } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search, Navigation, MapPin, ChevronDown, ZoomIn, Eye, Type, Volume2 } from 'lucide-react';

const BLUE = '#1a4fa0';

const pillBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 36,
  padding: '0 18px',
  borderRadius: 9999,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  border: '1px solid #d1d5db',
  background: '#ffffff',
  color: '#374151',
  transition: 'all 0.15s',
};

const pillActive: React.CSSProperties = {
  ...pillBase,
  background: BLUE,
  color: '#ffffff',
  border: `1px solid ${BLUE}`,
};

export default function MobileMap() {
  const [q, setQ] = useState('');
  const [destId, setDestId] = useState<string>(seedOffices[0].id);
  const initialFloor = getOffice(destId)?.floor ?? seedFloorMaps[0]?.floorNumber ?? 1;
  const [floor, setFloor] = useState<number>(Number(initialFloor));
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [language, setLanguage] = useState<'ENG' | 'CEB' | 'FIL'>('ENG');
  const [voiceGuide, setVoiceGuide] = useState(false);
  const dest = getOffice(destId);
  const routeStep = dest ? (Number(dest.floor) === 1 ? 3 : 4) : 3;

  const results = useMemo(
    () =>
      seedOffices.filter((office) =>
        !q || office.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <>
      <Head title="Interactive Map — DavaNav" />
      <AppHeader title="Interactive Map" subtitle="Find offices and routes inside City Hall" back />

      <main className="bg-slate-50 px-4 pb-24 pt-4">
        <section className="mb-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <Eye className="h-5 w-5 text-gov-blue" />
            <div>
              <div className="text-sm font-semibold text-slate-900">DavaNav Accessibility</div>
              <div className="text-xs text-slate-500">Tap options to make the map easier to use</div>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Language:</span>
              <div className="flex overflow-hidden rounded-full border border-slate-200">
                {(['ENG', 'CEB', 'FIL'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLanguage(item)}
                    className="h-8 px-3 text-xs font-bold transition"
                    style={
                      language === item
                        ? { background: BLUE, color: '#ffffff' }
                        : { background: 'transparent', color: '#64748b' }
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTextSize((current) => (current === 'normal' ? 'large' : 'normal'))}
                className="flex h-8 items-center gap-1.5 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Type className="h-3.5 w-3.5 text-gov-blue" />
                Text Size: {textSize === 'large' ? 'LARGE' : 'NORMAL'}
              </button>
              <button
                type="button"
                onClick={() => setVoiceGuide((value) => !value)}
                className="flex h-8 items-center gap-1.5 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Volume2 className="h-3.5 w-3.5 text-gov-blue" />
                Voice Guide: {voiceGuide ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {seedFloorMaps.map((floorMap) => (
              <button
                key={floorMap.id}
                type="button"
                title={floorMap.name}
                style={floor === floorMap.floorNumber ? pillActive : pillBase}
                onClick={() => setFloor(floorMap.floorNumber)}
              >
                Floor {floorMap.floorNumber}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200" style={{ boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
              <ZoomIn className="h-3.5 w-3.5" />
              Scroll to zoom in for the indoor floor view
            </div>
            <MapLibreFloorMap
              floor={floor}
              highlightId={
                dest
                  ? indoorRooms.find(
                      (r) => Number(dest.floor) === r.floor && r.room === dest.room,
                    )?.id
                  : undefined
              }
              onSelect={(roomId) => {
                const room = indoorRooms.find((r) => r.id === roomId);
                if (!room) return;
                const matched = seedOffices.find(
                  (o) => Number(o.floor) === room.floor && o.room === room.room,
                );
                if (matched) {
                  setDestId(matched.id);
                  setFloor(Number(matched.floor));
                }
              }}
            />
          </div>
        </section>

        <section className="mb-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search destination"
              className="h-10 rounded-xl border-slate-200 bg-white pl-9 text-sm focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>

          <div className="mt-3 max-h-72 space-y-1 overflow-auto">
            {results.map((office) => {
              const active = destId === office.id;
              return (
                <button
                  key={office.id}
                  onClick={() => {
                    setDestId(office.id);
                    setFloor(Number(office.floor));
                  }}
                  className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition-colors"
                  style={
                    active
                      ? { background: BLUE, color: '#ffffff' }
                      : { color: '#374151' }
                  }
                >
                  <span className="truncate font-medium">{office.name}</span>
                  <span
                    className="ml-2 shrink-0 text-xs font-semibold"
                    style={{ color: active ? 'rgba(255,255,255,0.75)' : '#9ca3af' }}
                  >
                    F{office.floor}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-center text-slate-300">
            <ChevronDown className="h-4 w-4" />
          </div>
        </section>

        {dest && (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
              Destination
            </div>
            <div className="mt-1 text-xl font-bold text-slate-950">{dest.name}</div>
            <div className="text-sm text-slate-500">Floor {dest.floor} · {dest.room}</div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Route
              </div>
              <ol className="mt-2 space-y-1.5 text-sm text-slate-700">
                <li>1. Start at {CITY_HALL_NAME} main entrance</li>
                <li>2. Take central corridor</li>
                {Number(dest.floor) !== 1 && (
                  <li>3. Use stairs / elevator to Floor {dest.floor}</li>
                )}
                <li>{routeStep}. Arrive at {dest.room}</li>
              </ol>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  ~{30 + Number(dest.floor) * 20} m
                </span>
                <span>~ {Number(dest.floor) + 1} min walk</span>
              </div>
            </div>

            <Link
              href={`/m/office/${dest.id}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b3d84] py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Navigation className="h-4 w-4" />
              View Office
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}