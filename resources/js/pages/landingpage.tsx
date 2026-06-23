import { Head, Link } from '@inertiajs/react';
import { SiteFooter } from '@/components/site-layout';
import { Button } from '@/components/ui/button';
import { QrCode, MapPin, Search, BarChart3, Accessibility, ShieldCheck, ScanLine, Building2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Head title="Navix Solution — QR-Based Office Navigation" />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-slate-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900">Navix</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">GOV NAVIGATION</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            <Link href="/" className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm">Home</Link>
            <Link href="/directory" className="text-sm font-medium text-slate-700 hover:text-slate-900">Directory</Link>
            <Link href="/map" className="text-sm font-medium text-slate-700 hover:text-slate-900">Map</Link>
            <Link href="/scan" className="text-sm font-medium text-slate-700 hover:text-slate-900">Scan QR</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Login
            </Link>
            <Link href="/scan" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">
              <QrCode className="h-4 w-4" />
              Scan QR
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-soft" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-lg shadow-slate-900/5">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-900" />
                Trusted by government offices
              </span>
              <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Find any office.
                <br />
                <span className="text-slate-900 text-blue-700">Just scan & go.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Navix Solution helps visitors navigate government offices with QR codes, interactive floor maps, and step-by-step directions — across mobile, tablet, and desktop.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/scan" className="inline-flex items-center gap-2">
                    <ScanLine className="h-5 w-5" />
                    Scan a QR Code
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/directory">Browse Directory</Link>
                </Button>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-6 text-sm text-slate-600">
                <div>
                  <dt className="uppercase tracking-[0.35em] text-slate-500">Offices</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">8+</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.35em] text-slate-500">Visitors</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">12K+</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.35em] text-slate-500">Avg. time saved</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">7m</dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-hero opacity-20 blur-2xl" />
              <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_40px_80px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-950">Civil Registry Office</div>
                    <div className="text-xs text-slate-500">Floor 1 · Room 101</div>
                  </div>
                  <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-700">OPEN</span>
                </div>
                <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6">
                  <div className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Walking route</div>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                    <li className="flex gap-2">
                      <span className="font-semibold text-blue-700">1.</span>
                      Enter through the main lobby
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-blue-700">2.</span>
                      Turn left at the central corridor
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-blue-700">3.</span>
                      Civil Registry is on your right
                    </li>
                  </ol>
                  <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-600" />
                      32 m
                    </span>
                    <span>~ 45 sec walk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">Everything visitors need, in one scan</h2>
            <p className="mt-4 text-slate-600">Designed for clarity, speed, and accessibility.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: QrCode,
                t: 'QR Code Navigation',
                d: 'Each office has a unique QR code. Scan to instantly view location and directions.',
              },
              {
                icon: Search,
                t: 'Smart Search',
                d: 'Instant search with autocomplete for offices, departments, and services.',
              },
              {
                icon: MapPin,
                t: 'Interactive Floor Maps',
                d: 'See routes highlighted directly on a clean, interactive building map.',
              },
              {
                icon: Building2,
                t: 'Office Directory',
                d: 'Filter by floor or department. Tap a card for full office details.',
              },
              {
                icon: BarChart3,
                t: 'Real-time Analytics',
                d: 'Admins track visitor flow and most-visited offices.',
              },
              {
                icon: Accessibility,
                t: 'Accessibility First',
                d: 'Large tap targets, high contrast, and screen-reader friendly.',
              },
            ].map((feature) => (
              <div key={feature.t} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{feature.t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">Built for public service</h2>
              <p className="mt-4 text-slate-600">Reduce queues, cut confusion, and give every visitor a clear path — including seniors and first-time visitors.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {[
                  'Reduces front-desk congestion',
                  'No app installation required',
                  'Works on any smartphone camera',
                  'Multi-floor wayfinding',
                  'Centralized admin control',
                  'Mobile, tablet, and desktop',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-700 text-[10px] font-bold text-white">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: '98%', v: 'Visitor satisfaction' },
                { k: '−45%', v: 'Front-desk inquiries' },
                { k: '7 min', v: 'Avg. time saved' },
                { k: '24/7', v: 'Self-service' },
              ].map((stat) => (
                <div key={stat.v} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-700">{stat.k}</div>
                  <div className="mt-1 text-sm text-slate-600">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-700">About</span>
              <h2 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">A SaaS for modern government wayfinding</h2>
              <p className="mt-4 text-slate-600">Navix Solution is a multi-tenant SaaS platform purpose-built for government buildings. From a single dashboard, agencies manage offices, departments, floor maps, and QR codes — while visitors enjoy a seamless, no-install experience.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-950">Tech Stack</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                {[
                  { k: 'Frontend', v: 'React + Tailwind' },
                  { k: 'Backend', v: 'Laravel API' },
                  { k: 'Database', v: 'MySQL' },
                  { k: 'Maps', v: 'Floor Map SVG' },
                  { k: 'QR', v: 'QR Generator' },
                  { k: 'Arch.', v: 'SaaS Multi-Tenant' },
                ].map((tech) => (
                  <div key={tech.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">{tech.k}</div>
                    <div className="mt-1 font-medium text-slate-900">{tech.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-blue-700 p-10 text-white shadow-[0_40px_80px_rgba(15,23,42,0.15)]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">Ready to roll out Navix?</h2>
                <p className="mt-3 text-white/80">Get a tailored demo for your office. We'll set up the directory, generate QR codes, and onboard your team.</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/directory" className="inline-flex items-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Link href="mailto:support@navix.gov">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
