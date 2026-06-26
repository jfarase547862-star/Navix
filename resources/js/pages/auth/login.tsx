import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { router, Link } from "@inertiajs/react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <div
        className="relative hidden lg:flex lg:flex-col lg:justify-between p-10 text-white"
        style={{
          background: "linear-gradient(135deg, #1a56c4 0%, #1347a8 60%, #0f3d95 100%)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="grid h-9 w-9 place-items-center rounded-lg"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <QrCode className="h-5 w-5" />
          </div>
          <span className="font-bold text-[15px]">Navix Solution</span>
        </Link>

        <div>
          <h1 className="font-bold text-[2rem] leading-tight">
            Manage your wayfinding system from one secure dashboard.
          </h1>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            Offices, QR codes, floor maps, and live analytics — all in one place.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          <ShieldCheck className="h-4 w-4" />
          Encrypted, role-based access
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex items-center justify-center p-6 sm:p-12"
        style={{ backgroundColor: "#f8f9fb" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            router.visit("/admin");
          }}
          className="w-full max-w-sm space-y-4"
        >
          <div className="mb-6">
            <h2 className="text-[22px] font-bold text-gray-900">Sign in to Navix Admin</h2>
            <p className="mt-1 text-sm text-gray-500">
              Use any credentials for the prototype.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-gray-800">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="admin@navix.gov"
              required
              className="h-10 rounded-lg border-gray-200 bg-white text-sm focus:border-[#1a56c4] focus:ring-[#1a56c4]/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-gray-800">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              defaultValue="demo1234"
              required
              className="h-10 rounded-lg border-gray-200 bg-white text-sm focus:border-[#1a56c4] focus:ring-[#1a56c4]/20"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg text-[15px] font-semibold text-white"
            style={{ backgroundColor: "#1a4fa0" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <div className="text-center text-xs text-gray-400 pt-1">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              ← Back to site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}