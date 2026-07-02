import { Head, Link, router } from "@inertiajs/react";
import { AppHeader } from "@/components/mobile/AppHeader";
import { Footer } from "@/components/mobile/Footer";
import { FloorMap } from "@/components/floor-map";
import { Button } from "@/components/ui/button";
import { getOffice, FLOOR_LAYOUT } from "@/lib/mock-data";
import {
  buildGrid,
  dijkstra,
  doorCell,
  pathDistanceMeters,
  pathToSteps,
  walkingTimeMinutes,
  type Cell,
} from "@/lib/pathfinding";
import { Clock, Footprints, MapPin, Navigation, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Inertia page wrapper — `officeId` arrives as a page prop from the route/controller
export default function NavigatePageWrapper({ officeId }: Readonly<{ officeId: string }>) {
  return (
    <>
      <Head title="Indoor Navigation — DavaNav" />
      <NavigatePage officeId={officeId} />
    </>
  );
}

function NavigatePage({ officeId }: Readonly<{ officeId: string }>) {
  const office = getOffice(officeId);
  const [phase, setPhase] = useState<"analyzing" | "ready">("analyzing");
  const [shownFloor, setShownFloor] = useState<1 | 2>(1);

  useEffect(() => {
    if (!office) return;
    if (!office.internal) {
      router.visit(`/accessibility/${officeId}`, { preserveState: true, replace: true });
    }
  }, [office, officeId]);

  // A* still powers the distance / walk-time / step-by-step stats,
  // even though the visual map below is the static BlueprintMap.
  const plan = useMemo(() => {
    if (!office || !office.internal) return null;
    const dest = doorCell(office);
    const stairs: Cell = { x: 7, y: 4 };
    if (Number(office.floor) === 1) {
      const grid = buildGrid(1);
      const res = dijkstra(grid, FLOOR_LAYOUT.entrance, dest);
      return {
        ground: res,
        second: null as null | ReturnType<typeof dijkstra>,
      };
    } else {
      const g1 = buildGrid(1);
      const r1 = dijkstra(g1, FLOOR_LAYOUT.entrance, stairs);
      const g2 = buildGrid(2);
      const r2 = dijkstra(g2, stairs, dest);
      return { ground: r1, second: r2 };
    }
  }, [office]);

  useEffect(() => {
    if (!plan) return;
    setPhase("analyzing");
    setShownFloor(1);
    const t = setTimeout(() => setPhase("ready"), 1800);
    return () => clearTimeout(t);
  }, [plan]);

  if (!office) {
    return (
      <>
        <AppHeader title="Office not found" back />
<main className="px-4 pt-4">
  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
    We couldn't find that office.
  </div>
  <Link
    href="/directory"
    className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#0b3d84] py-3 text-sm font-semibold text-white"
  >
    Back to Directory
  </Link>
</main>
      </>
    );
  }

  if (!office.internal || !plan) {
    return null;
  }

  const distance = pathDistanceMeters(plan.ground.path) + (plan.second ? pathDistanceMeters(plan.second.path) : 0);
  const minutes = walkingTimeMinutes(distance);
  const steps = [
    ...pathToSteps(plan.ground.path, plan.second ? "the Staircase" : office.name),
    ...(plan.second
      ? ["Take the stairs to the Second Floor.", ...pathToSteps(plan.second.path, office.name)]
      : []),
  ];

  return (
    <>
      <AppHeader
        title={office.shortName ?? office.name}
        subtitle={`Floor ${Number(office.floor) === 1 ? "1 · Ground" : "2 · Second"}`}
        back
      />
      <main className="space-y-4 px-4 pt-4 pb-24">
        {/* Status / route summary */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          {phase === "analyzing" ? (
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 animate-pulse place-items-center rounded-full bg-gov-blue-soft text-gov-blue">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">Computing shortest route…</div>
                <div className="text-xs text-muted-foreground">A* pathfinding · visualizing explored cells</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <Stat icon={<Footprints className="h-4 w-4" />} label="Distance" value={`${distance} m`} />
              <Stat icon={<Clock className="h-4 w-4" />} label="Walk time" value={`~${Math.max(1, Math.round(minutes))} min`} />
              <Stat icon={<MapPin className="h-4 w-4" />} label="Floors" value={plan.second ? "1 → 2" : "Ground"} />
            </div>
          )}
        </div>

        {/* Floor switcher (when route spans floors) */}
        {plan.second && (
          <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
            {[1, 2].map((f) => (
              <button
                key={f}
                onClick={() => setShownFloor(f as 1 | 2)}
                className={
                  "flex-1 rounded-lg px-3 py-2 text-xs font-semibold " +
                  (shownFloor === f
                    ? "bg-gov-blue text-gov-blue-foreground"
                    : "text-foreground/70")
                }
              >
                {f === 1 ? "Ground Floor" : "Second Floor"}
              </button>
            ))}
          </div>
        )}

        <FloorMap floor={shownFloor} highlightId={office.id} />

        {/* Step directions */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="text-xs font-semibold uppercase tracking-wider text-gov-blue">Step-by-step</div>
          <ol className="mt-3 space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gov-gold text-xs font-bold text-gov-gold-foreground">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/85">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setPhase("analyzing");
                setTimeout(() => setPhase("ready"), 1400);
              }}
            >
              <RotateCcw className="h-4 w-4" /> Recalculate
            </Button>
            <Button asChild size="sm" className="flex-1 bg-[#0b3d84] text-white hover:bg-[#0a2f66]">
              <Link href="/directory">
                <Navigation className="h-4 w-4" /> Another Office
              </Link>
            </Button>
          </div>
        </div>

        {/* Office summary */}
        <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
          <div className="font-semibold text-foreground">{office.name}</div>
          <div className="text-xs text-muted-foreground">{office.hours} · {office.contact}</div>
          {(office.services ?? []).length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {(office.services ?? []).map((s) => (
                <li key={s} className="rounded-md bg-card px-2 py-1 text-[11px] text-foreground/80">{s}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gov-blue-soft/50 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-gov-blue">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-bold text-foreground">{value}</div>
    </div>
  );
}