import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Admin — Navix" }] }),
  component: AdminIndex,
});

function AdminIndex() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav className="space-x-3">
          <Link to="/admin/analytics">Analytics</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </div>
      <div className="mt-6">Welcome to the Navix admin dashboard.</div>
    </div>
  );
}

export default AdminIndex;
