import { Link } from "@inertiajs/react";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { BottomNav } from "./BottomNav";

export function Footer() {
  return (
    <> 
      <footer id="contact" className="border-t border-border bg-gov-blue text-gov-blue-foreground pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          
          <div>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/m/home" className="hover:text-gov-gold">Visitor Dashboard</Link></li>              
              <li><Link href="/m/search" className="hover:text-gov-gold">Search</Link></li>
              <li><Link href="/m/map" className="hover:text-gov-gold">Interactive Map</Link></li>
              <li><Link href="/m/scan" className="hover:text-gov-gold">QR Scanner</Link></li>
            </ul>
          </div>
         
          
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row sm:px-6">
            <div>© {new Date().getFullYear()} DavaNav Solution · Davao City Government</div>
          </div>
        </div>
      </footer>
      <BottomNav />
    </>
  );
}