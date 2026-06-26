import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Admin — Analytics — Navix" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="mt-4">Visitor traffic and QR code stats appear here.</p>
      <div className="mt-6">
        <Link to="/admin">← Back to dashboard</Link>
      </div>
    </div>
  );
}

export default AnalyticsPage;
