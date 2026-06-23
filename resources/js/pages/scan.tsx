import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { SiteFooter, SiteHeader } from '@/components/site-layout';
import { Button } from '@/components/ui/button';
import { ScanLine, Camera, QrCode } from 'lucide-react';
import { offices } from '@/lib/mock-data';

export default function Scan() {
  const [scanning, setScanning] = useState(false);
  const [matched, setMatched] = useState<string | null>(null);

  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(() => {
      const pick = offices[Math.floor(Math.random() * offices.length)];
      setMatched(pick.id);
      setScanning(false);
    }, 2200);
    return () => clearTimeout(t);
  }, [scanning]);

  const match = offices.find((office) => office.id === matched);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Head title="Scan QR" />
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="text-3xl font-bold">Scan Office QR</h1>
          <p className="mt-2 text-muted-foreground">Point your camera at the QR code posted at any office or hallway.</p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
            <div className="relative aspect-square bg-[oklch(0.18_0.04_250)]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative h-64 w-64">
                  {[
                    'top-0 left-0 border-l-4 border-t-4',
                    'top-0 right-0 border-r-4 border-t-4',
                    'bottom-0 left-0 border-l-4 border-b-4',
                    'bottom-0 right-0 border-r-4 border-b-4',
                  ].map((c) => (
                    <span key={c} className={`absolute h-8 w-8 rounded-md border-primary ${c}`} />
                  ))}
                  {scanning && (
                    <div
                      className="absolute left-0 right-0 top-0 h-0.5 animate-[scan_2s_ease-in-out_infinite] bg-primary shadow-[0_0_15px_2px_oklch(0.62_0.18_250)]"
                      style={{ animation: 'scan 2s ease-in-out infinite' }}
                    />
                  )}
                </div>
              </div>
              <style>{`@keyframes scan { 0%,100% { transform: translateY(0) } 50% { transform: translateY(256px) } }`}</style>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                {scanning ? 'Scanning…' : 'Camera ready'}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Camera className="h-4 w-4" /> Prototype simulator
              </div>
              <Button onClick={() => { setMatched(null); setScanning(true); }} disabled={scanning}>
                <ScanLine className="mr-2 h-4 w-4" />
                {scanning ? 'Scanning…' : 'Simulate Scan'}
              </Button>
            </div>
          </div>

          {match && (
            <div className="mt-6 rounded-2xl border border-success/30 bg-success/5 p-5">
              <div className="flex items-center gap-2 text-success">
                <QrCode className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-widest">QR detected</span>
              </div>
              <div className="mt-2 font-display text-xl font-semibold">{match.name}</div>
              <div className="text-sm text-muted-foreground">Floor {match.floor} · {match.room}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild>
                  <Link href={`/office/${match.id}`}>View Office</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/map?to=${match.id}`}>Navigate on Map</Link>
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            Or jump straight to the{' '}
            <Link href="/directory" className="text-primary underline">
              Office Directory
            </Link>.
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
