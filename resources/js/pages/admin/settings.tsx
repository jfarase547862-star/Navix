import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Admin — Settings — Navix" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-4">Admin settings and configuration.</p>
      <div className="mt-6">
        <Link to="/admin">← Back to dashboard</Link>
      </div>
    </div>
  );
}

export default SettingsPage;
