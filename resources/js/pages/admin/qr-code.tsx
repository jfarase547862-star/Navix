import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Admin — QR Codes — Navix" }] }),
  component: QrCodePage,
});

function QrCodePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">QR Codes</h1>
      <p className="mt-4">Generate and manage QR codes for offices.</p>
      <div className="mt-6">
        <Link to="/admin">← Back to dashboard</Link>
      </div>
    </div>
  );
}

export default QrCodePage;
