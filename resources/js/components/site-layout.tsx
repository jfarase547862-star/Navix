import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { QrCode, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/directory', label: 'Directory' },
  { href: '/map', label: 'Map' },
  { href: '/scan', label: 'Scan QR' },
];

function normalizePathname(url: string | undefined) {
  if (!url) {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  }

  try {
    return new URL(url, 'http://localhost').pathname;
  } catch {
    return url.split('?')[0];
  }
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const page = usePage();
  const pathname = normalizePathname(page.url);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant">
            <QrCode className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">Navix</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Gov Navigation</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" size="sm">
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/scan">
              <QrCode className="mr-2 h-4 w-4" />Scan QR
            </Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-hero text-primary-foreground">
                <QrCode className="h-4 w-4" />
              </div>
              <span className="font-display font-bold">Navix Solution</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">QR-based wayfinding for modern government offices.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/directory">Office Directory</Link>
              </li>
              <li>
                <Link href="/map">Interactive Map</Link>
              </li>
              <li>
                <Link href="/scan">Scan QR</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">For Staff</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/admin/login">Admin Login</Link>
              </li>
              <li>
                <Link href="/admin">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>support@navix.gov</li>
              <li>(02) 8123-4500</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Navix Solution. Government digital services.
        </div>
      </div>
    </footer>
  );
}
