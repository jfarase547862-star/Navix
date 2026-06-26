import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Admin — Departments — Navix" }] }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Departments</h1>
      <p className="mt-4">Create and manage departments.</p>
      <div className="mt-6">
        <Link to="/admin">← Back to dashboard</Link>
      </div>
    </div>
  );
}

export default DepartmentsPage;
