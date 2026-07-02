import { Head, Link } from "@inertiajs/react";
import { AppHeader } from "@/components/mobile/AppHeader";
import { Footer } from "@/components/mobile/Footer";

import {
  QrCode,
  Building2,
  Search,
  Compass,
  Map,
  Star,
  ArrowRight,
} from "lucide-react";

type Card = { to: string; icon: typeof QrCode; title: string; desc: string; accent?: boolean };

const cards: Card[] = [
  { to: "/m/scan", icon: QrCode, title: "Scan QR", desc: "Detect my location", accent: true },
  { to: "/m/directory", icon: Building2, title: "Office Directory", desc: "Browse all offices" },
  { to: "/m/search", icon: Compass, title: "Search Service", desc: "Find the right office" },
  { to: "/m/map", icon: Map, title: "Interactive Map", desc: "Ground & Second floors" },
];

export default function Dashboard() {
  return (
    <>
      <Head title="Visitor Dashboard — DavaNav" />
      <AppHeader title="Good day, Visitor" subtitle="Davao City Hall · Main Building" />

      <main className="bg-slate-50 px-4 pb-4 pt-4">
        {/* Hero scan card */}
        <Link
          href="/scan"
          className="relative block overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b3d84] via-[#123f7f] to-[#0a2f66] text-white shadow-[0_12px_28px_-8px_rgba(10,47,102,0.55)]"
        >
          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5">
            <div className="min-w-0">
              <div className="text-xs font-semibold tracking-wide text-amber-400">
                Quickest way to start
              </div>
              <h2 className="mt-1 text-xl font-bold leading-snug">
                Scan a QR to set your location
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                Available at all City Hall entrances and office signage.
              </p>
              <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-[#1a1a1a] transition hover:bg-amber-300">
                Open scanner <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <QrCode className="h-8 w-8" strokeWidth={1.75} />
            </div>
          </div>
        </Link>

        {/* Quick action grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.to}
              className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#0b3d84]/25 hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.15)]"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  c.accent
                    ? "bg-amber-400 text-[#1a1a1a]"
                    : "bg-blue-50 text-[#0b3d84]"
                }`}
              >
                <c.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-bold text-slate-900">{c.title}</div>
                <div className="truncate text-xs text-slate-500">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tip card */}
        <div className="mt-5 rounded-2xl border border-dashed border-[#0b3d84]/25 bg-blue-50/60 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0b3d84]">Tip</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-700">
            Not sure where to go? Try{" "}
            <Link href="/search" className="font-semibold text-[#0b3d84] underline-offset-2 hover:underline">
              Search by Service
            </Link>{" "}
            — type something like "business permit" or "birth certificate".
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}