import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Navix" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-gradient-hero p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 backdrop-blur"><QrCode className="h-5 w-5" /></div>
          <span className="font-display font-bold">Navix Solution</span>
        </Link>
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight">Manage your wayfinding system from one secure dashboard.</h1>
          <p className="mt-4 text-primary-foreground/80">Offices, QR codes, floor maps, and live analytics — all in one place.</p>
        </div>
        <div className="text-xs text-primary-foreground/70 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Encrypted, role-based access</div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <form
          onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => navigate({ to: "/admin" }), 700); }}
          className="w-full max-w-sm space-y-5"
        >
          <div>
            <h2 className="font-display text-2xl font-bold">Sign in to Navix Admin</h2>
            <p className="mt-1 text-sm text-muted-foreground">Use any credentials for the prototype.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@navix.gov" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="demo1234" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
          <div className="text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Back to site</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

