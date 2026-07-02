import { Head, Link } from '@inertiajs/react';
import { Users, Plus, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SuperadminShell } from '@/components/superadmin/superadmin-shell';

const adminAccounts = [
    { id: 1, name: 'Aileen Cruz', email: 'aileen@davanav.gov', role: 'Administrator', status: 'Active' },
    { id: 2, name: 'Rafael Santos', email: 'rafael@davanav.gov', role: 'Administrator', status: 'Inactive' },
    { id: 3, name: 'Maya Delos', email: 'maya@davanav.gov', role: 'Administrator', status: 'Active' },
    { id: 4, name: 'Noel Reyes', email: 'noel@davanav.gov', role: 'Administrator', status: 'Pending' },
];

export default function AdminAccounts() {
    return (
        <>
            <Head title="Superadmin — Admin Accounts" />
            <SuperadminShell
                title="Admin Accounts"
                description="Manage administrators who have access to the City Hall navigation system."
                actions={
                    <Button asChild>
                        <Link href="/superadmin/users">
                            <Plus className="mr-2 h-4 w-4" /> Invite Admin
                        </Link>
                    </Button>
                }
            >
                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrator roster</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead>
                                        <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Role</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {adminAccounts.map((account) => (
                                            <tr key={account.id}>
                                                <td className="px-4 py-3 font-medium text-gray-900">{account.name}</td>
                                                <td className="px-4 py-3 text-gray-600">{account.email}</td>
                                                <td className="px-4 py-3 text-gray-600">{account.role}</td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline" className={account.status === 'Active' ? 'border-green-200 text-green-700 bg-green-50' : account.status === 'Inactive' ? 'border-gray-200 text-gray-500 bg-gray-50' : 'border-yellow-200 text-yellow-700 bg-yellow-50'}>
                                                        {account.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href="/superadmin/users">View</Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 sm:grid-cols-2">
                            <Button variant="outline" asChild>
                                <Link href="/superadmin/system-settings">
                                    <ShieldCheck className="mr-2 h-4 w-4" /> Review system policies
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/superadmin/analytics">
                                    <Users className="mr-2 h-4 w-4" /> Audit admin activity
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </SuperadminShell>
        </>
    );
}
