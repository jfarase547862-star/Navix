import { Head, Link } from '@inertiajs/react';
import { AdminShell } from '@/components/admin-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Office {
  id: string;
  name: string;
  department: string;
  floor: number;
  room: string;
  contact: string;
}

interface Props {
  offices: Office[];
}

export default function AdminOffices({ offices }: Props) {
  const [q, setQ] = useState('');
  const list = offices.filter((o) => !q || o.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <Head title="Offices — Navix Admin" />
      <AdminShell title="Offices">
        <div className="rounded-2xl border border-border bg-card shadow-card">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search offices"
                className="pl-9"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Office
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Office</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Floor</th>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <Link
                        href={`/office/${o.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {o.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{o.department}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">F{o.floor}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{o.room}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.contact}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </AdminShell>
    </>
  );
}