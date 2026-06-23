import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { SiteFooter, SiteHeader } from '@/components/site-layout';
import { FloorMap } from '@/components/floor-map';
import { offices, getOffice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Navigation, MapPin } from 'lucide-react';

export default function Map() {
  const [q, setQ] = useState('');
  const [destId, setDestId] = useState<string>(offices[0].id);
  const initialFloor = getOffice(destId)?.floor ?? 1;
  const [floor, setFloor] = useState<number>(initialFloor);

  const dest = getOffice(destId);
  const results = useMemo(
    () => offices.filter((office) => !q || office.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <Head title="Interactive Map" />
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <h1 className="text-3xl font-bold">Interactive Map</h1>
            <p className="mt-2 text-muted-foreground">Pick a destination and follow the route.</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
              <aside className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destination" className="pl-9" />
                  </div>
                  <div className="mt-3 max-h-72 space-y-1 overflow-auto">
                    {results.map((office) => (
                      <button
                        key={office.id}
                        onClick={() => {
                          setDestId(office.id);
                          setFloor(office.floor);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          destId === office.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                        }`}
                      >
                        <span className="truncate">{office.name}</span>
                        <span className={`text-xs ${destId === office.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          F{office.floor}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {dest && (
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">Destination</div>
                    <div className="mt-1 font-display text-lg font-semibold">{dest.name}</div>
                    <div className="text-sm text-muted-foreground">Floor {dest.floor} · {dest.room}</div>
                    <div className="mt-4 rounded-xl border border-dashed border-border bg-secondary/40 p-4">
                      <div className="text-xs font-medium text-muted-foreground">Route</div>
                      <ol className="mt-2 space-y-1.5 text-sm">
                        <li>1. Start at main entrance</li>
                        <li>2. Take central corridor</li>
                        {dest.floor !== 1 && <li>3. Use stairs / elevator to Floor {dest.floor}</li>}
                        <li>{dest.floor !== 1 ? 4 : 3}. Arrive at {dest.room}</li>
                      </ol>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> ~{30 + dest.floor * 20} m</span>
                        <span>~ {dest.floor + 1} min walk</span>
                      </div>
                    </div>
                    <Button asChild className="mt-4 w-full">
                      <Link href={`/office/${dest.id}`} className="inline-flex w-full items-center justify-center gap-2">
                        <Navigation className="mr-2 h-4 w-4" />
                        View Office
                      </Link>
                    </Button>
                  </div>
                )}
              </aside>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3].map((f) => (
                    <Button key={f} size="sm" variant={floor === f ? 'default' : 'outline'} onClick={() => setFloor(f)}>
                      Floor {f}
                    </Button>
                  ))}
                </div>

                <FloorMap floor={floor} highlightId={dest?.floor === floor ? dest.id : undefined} showRoute onSelect={(office) => {
                  setDestId(office.id);
                  setFloor(office.floor);
                }} />

                <div>
                  <h3 className="font-display text-lg font-semibold">Nearby Offices on Floor {floor}</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {offices.filter((office) => office.floor === floor).map((office) => (
                      <Link
                        key={office.id}
                        href={`/office/${office.id}`}
                        className="rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                      >
                        <div className="text-xs text-muted-foreground">{office.room}</div>
                        <div className="mt-1 font-semibold">{office.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{office.department}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
