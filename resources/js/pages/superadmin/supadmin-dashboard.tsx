import { Head, Link } from '@inertiajs/react';
import {
    Users, Settings, Database, Cloud, Zap, AlertCircle,
    Shield, BarChart3, HardDrive, Plus, CheckCircle2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SuperadminShell } from '@/components/superadmin/superadmin-shell';
import {
    LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const systemStats = [
    { label: 'Total Admin Accounts', value: 12, icon: Users, color: 'text-blue-600 bg-blue-100' },
    { label: 'System Health', value: '98%', icon: Zap, color: 'text-green-600 bg-green-100' },
    { label: 'Active Sessions', value: 24, icon: Shield, color: 'text-purple-600 bg-purple-100' },
    { label: 'Disk Usage', value: '67%', icon: HardDrive, color: 'text-orange-600 bg-orange-100' },
];

const systemHealth = [
    { time: 'Mon', uptime: 99.8 },
    { time: 'Tue', uptime: 99.9 },
    { time: 'Wed', uptime: 99.7 },
    { time: 'Thu', uptime: 99.9 },
    { time: 'Fri', uptime: 99.8 },
    { time: 'Sat', uptime: 99.6 },
    { time: 'Sun', uptime: 99.9 },
];

const systemEvents = [
    { id: 1, type: 'Admin Added', user: 'superadmin@davanav.gov', description: 'New admin account created', at: '2 hours ago', status: 'success' },
    { id: 2, type: 'Database Backup', user: 'System', description: 'Full database backup completed', at: '4 hours ago', status: 'success' },
    { id: 3, type: 'Settings Updated', user: 'superadmin@davanav.gov', description: 'Email configuration updated', at: '1 day ago', status: 'success' },
    { id: 4, type: 'Login Attempt', user: 'admin@davanav.gov', description: 'Successful admin login', at: '2 days ago', status: 'info' },
];

const managementItems = [
    { id: 1, name: 'Admin Accounts', status: 'Active', count: 12 },
    { id: 2, name: 'System Settings', status: 'Configured', count: 18 },
    { id: 3, name: 'Database Schema', status: 'Healthy', count: 42 },
    { id: 4, name: 'Deployment', status: 'Running', count: 1 },
    { id: 5, name: 'Performance', status: 'Optimal', count: 7 },
];

export default function SuperadminDashboard() {
    return (
        <>
            <Head title="Superadmin Dashboard" />
            <SuperadminShell
                title="System Dashboard"
                description="Manage system-wide settings, admins, and infrastructure."
                actions={
                    <>
                        <Button variant="outline" asChild>
                            <Link href="/superadmin/analytics">
                                <BarChart3 className="mr-2 h-4 w-4" /> System Logs
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/superadmin/users">
                                <Plus className="mr-2 h-4 w-4" /> Add Admin
                            </Link>
                        </Button>
                    </>
                }
            >
                {/* System Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {systemStats.map((s) => {
                        const Icon = s.icon;
                        return (
                            <Card key={s.label}>
                                <CardContent className="flex items-center justify-between gap-3 p-4">
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.color}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <div className="text-xs text-gray-500">{s.label}</div>
                                        <div className="mt-1 self-end text-xl font-semibold">{s.value}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* System Health Chart + Events */}
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>System Uptime — This Week</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={systemHealth}>
                                        <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                                        <YAxis stroke="#9ca3af" fontSize={12} domain={[99, 100]} />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: 8,
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="uptime"
                                            stroke="#1a56c4"
                                            strokeWidth={2}
                                            dot={{ fill: '#1a56c4', r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>System Events</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {systemEvents.map((e) => (
                                <div key={e.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                        e.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {e.status === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div>
                                            <span className="font-medium">{e.type}</span>
                                        </div>
                                        <div className="text-xs text-gray-400">{e.description} • {e.at}</div>
                                    </div>
                                </div>
                            ))}
                            <Link href="/superadmin/notifications" className="block text-center text-xs text-blue-600 hover:underline">
                                View all events
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* System Management */}
                <Card className="mt-6">
                    <CardHeader><CardTitle>System Management</CardTitle></CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            { label: 'Admin Accounts', icon: Users, href: '/superadmin/admin-accounts' },
                            { label: 'Settings', icon: Settings, href: '/superadmin/system-settings' },
                            { label: 'Database', icon: Database, href: '/superadmin/database-schema' },
                            { label: 'Performance', icon: Zap, href: '/superadmin/performance' },
                            { label: 'Backup & Recovery', icon: Cloud, href: '/superadmin/backup-recovery' },
                        ].map((a) => (
                            <Button key={a.label} variant="outline" className="h-auto justify-start gap-3 py-3" asChild>
                                <Link href={a.href}>
                                    <a.icon className="h-5 w-5 text-blue-600" />
                                    <span>{a.label}</span>
                                </Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Management Overview */}
                <Card className="mt-6">
                    <CardHeader><CardTitle>System Components</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {managementItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between rounded-md border bg-white px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                                            {item.status}
                                        </Badge>
                                        <div>
                                            <div className="text-sm font-medium">{item.name}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">{item.count} items</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </SuperadminShell>
        </>
    );
}
