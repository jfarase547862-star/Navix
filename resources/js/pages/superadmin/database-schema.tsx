import { Head, Link } from '@inertiajs/react';
import { Database, Columns, LayoutGrid, ShieldCheck } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SuperadminShell } from '@/components/superadmin/superadmin-shell';

const tables = [
	{ id: 1, name: 'Users', records: '3.2k', updated: '5 mins ago', status: 'Good' },
	{ id: 2, name: 'Offices', records: '482', updated: '1 day ago', status: 'Good' },
	{ id: 3, name: 'Nav Routes', records: '1.1k', updated: '2 hours ago', status: 'Warning' },
	{ id: 4, name: 'Scans', records: '12.8k', updated: '10 mins ago', status: 'Good' },
];

export default function DatabaseSchema() {
	return (
		<>
			<Head title="Superadmin — Database Schema" />
			<SuperadminShell
				title="Database Schema"
				description="Review schema health, table status, and migration readiness for the system database."
				actions={
					<Button variant="outline" asChild>
						<Link href="/superadmin/backup-recovery">
							<Database className="mr-2 h-4 w-4" /> Run schema check
						</Link>
					</Button>
				}
			>
				<div className="grid gap-4 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Schema overview</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-4 sm:grid-cols-2">
							{[
								{ label: 'Total tables', value: '24', icon: LayoutGrid },
								{ label: 'Indexed tables', value: '22', icon: Columns },
							].map((item) => {
								const Icon = item.icon;
								return (
									<div key={item.label} className="rounded-lg border border-gray-200 p-4">
										<div className="flex items-center gap-3 text-gray-700">
											<Icon className="h-5 w-5 text-sky-600" />
											<div>
												<div className="text-xs uppercase text-gray-500">{item.label}</div>
												<div className="text-lg font-semibold">{item.value}</div>
											</div>
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Table health</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200 text-sm">
									<thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
										<tr>
											<th className="px-4 py-3">Table</th>
											<th className="px-4 py-3">Records</th>
											<th className="px-4 py-3">Updated</th>
											<th className="px-4 py-3">Status</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-100 bg-white">
										{tables.map((table) => (
											<tr key={table.id}>
												<td className="px-4 py-3 font-medium text-gray-900">{table.name}</td>
												<td className="px-4 py-3 text-gray-600">{table.records}</td>
												<td className="px-4 py-3 text-gray-600">{table.updated}</td>
												<td className="px-4 py-3">
													<Badge variant="outline" className={table.status === 'Good' ? 'border-green-200 bg-green-50 text-green-700' : 'border-yellow-200 bg-yellow-50 text-yellow-700'}>
														{table.status}
													</Badge>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</div>
			</SuperadminShell>
		</>
	);
}
