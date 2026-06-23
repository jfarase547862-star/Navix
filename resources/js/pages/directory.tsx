import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { SiteFooter, SiteHeader } from '@/components/site-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

const departments = [
  'Civil Registry',
  'Treasury',
  'Assessor',
  'Health',
  'Engineering',
  'Social Welfare',
  "Mayor's Office",
];

const offices = [
  {
    id: 'civil-registry',
    name: 'Civil Registry Office',
    department: 'Civil Registry',
    services: ['Birth certificates', 'Marriage certificates', 'Death certificates'],
    description: 'Handles birth, marriage, and death certificates and related civil documents.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4501',
    floor: 1,
    room: 'Room 101',
  },
  {
    id: 'treasury',
    name: 'Treasury Office',
    department: 'Treasury',
    services: ['Tax payments', 'Revenue collection'],
    description: 'Collection of taxes, fees, and other government revenues.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4502',
    floor: 1,
    room: 'Room 105',
  },
  {
    id: 'business-permits',
    name: 'Business Permits & Licensing',
    department: 'Assessor',
    services: ['Permit issuance', 'License renewals'],
    description: 'Issuance and renewal of business permits and licenses.',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    contact: '(02) 8123-4503',
    floor: 2,
    room: 'Room 201',
  },
];

export default function Directory() {
  const [q, setQ] = useState('');
  const [floor, setFloor] = useState<number | null>(null);
  const [dept, setDept] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return offices.filter((office) => {
      const matchesQ =
        !q ||
        `${office.name} ${office.department} ${office.services.join(' ')}`.toLowerCase().includes(q.toLowerCase());
      const matchesF = floor == null || office.floor === floor;
      const matchesD = !dept || office.department === dept;
      return matchesQ && matchesF && matchesD;
    });
  }, [q, floor, dept]);

  const floors = [1, 2, 3];

  return (
    <>
      <Head title="Office Directory" />
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <div className="border-b border-border bg-gradient-soft">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
              <h1 className="text-3xl font-bold sm:text-4xl">Office Directory</h1>
              <p className="mt-2 text-muted-foreground">Find any office, department, or service.</p>

              <div className="mt-6 relative max-w-2xl">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search offices, services, or departments..."
                  className="h-12 pl-10 text-base"
                />
                {q && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-popover shadow-elegant">
                    {filtered.slice(0, 5).map((office) => (
                      <Link
                        key={office.id}
                        href={`/office/${office.id}`}
                        className="flex items-center justify-between px-4 py-2 text-sm hover:bg-secondary"
                      >
                        <span>{office.name}</span>
                        <span className="text-xs text-muted-foreground">Floor {office.floor}</span>
                      </Link>
                    ))}
                    {filtered.length === 0 && (
                      <div className="px-4 py-3 text-sm text-muted-foreground">No matches</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Floor:</span>
              <Button size="sm" variant={floor == null ? 'default' : 'outline'} onClick={() => setFloor(null)}>
                All
              </Button>
              {floors.map((f) => (
                <Button key={f} size="sm" variant={floor === f ? 'default' : 'outline'} onClick={() => setFloor(f)}>
                  Floor {f}
                </Button>
              ))}
              <span className="ml-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dept:</span>
              <Button size="sm" variant={!dept ? 'default' : 'outline'} onClick={() => setDept(null)}>
                All
              </Button>
              {departments.map((d) => (
                <Button key={d} size="sm" variant={dept === d ? 'default' : 'outline'} onClick={() => setDept(d)}>
                  {d}
                </Button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((office) => (
                <Link
                  key={office.id}
                  href={`/office/${office.id}`}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Floor {office.floor}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{office.room}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-tight">{office.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{office.description}</p>
                  <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {office.hours}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      {office.contact}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {office.department}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm font-medium text-primary">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                  No offices match your filters.
                </div>
              )}
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
