import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, PawPrint, Phone, Siren, Twitter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/booking";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/vets", label: "Find Vets" },
  { to: "/services", label: "Services" },
  { to: "/passport", label: "Pet Passport" },
  { to: "/about", label: "About Us" },
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <PawPrint className="size-5" />
      </span>
      <span className={light ? "font-display text-xl font-semibold text-ink-foreground" : "font-display text-xl font-semibold"}>
        PetVet <span className="text-primary">Georgia</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { open } = useBooking();
  const [mobile, setMobile] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground" activeProps={{ className: "bg-primary-soft text-accent-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="cta" className="hidden sm:inline-flex" onClick={() => open()}>Book Appointment</Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {mobile && (
        <nav className="grid gap-1 border-t px-5 py-3 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMobile(false)} className="rounded-xl px-3 py-2 font-medium hover:bg-muted">{n.label}</Link>
          ))}
          <Button variant="cta" className="mt-2" onClick={() => { setMobile(false); open(); }}>Book Appointment</Button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm">Georgia's digital veterinary clinic — trusted vets, digital passports and smart reminders, all in one place.</p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid size-10 place-items-center rounded-xl bg-ink-foreground/10 text-ink-foreground transition hover:bg-primary">
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-ink-foreground">Quick links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-ink-foreground">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-primary" /> 12 Rustaveli Ave, Tbilisi</li>
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-primary" /> 45 Chavchavadze St, Batumi</li>
            <li className="flex gap-2"><Phone className="size-4 shrink-0 text-primary" /> +995 32 200 00 00</li>
            <li className="flex gap-2"><Mail className="size-4 shrink-0 text-primary" /> hello@petvet.ge</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-cta/15 p-6">
          <Siren className="mb-3 size-7 text-cta" />
          <h4 className="font-semibold text-ink-foreground">24/7 Emergency Hotline</h4>
          <a href="tel:+995322112112" className="mt-2 block font-display text-2xl font-semibold text-cta">+995 32 211 2112</a>
          <p className="mt-2 text-sm">Urgent care, any hour, in Tbilisi & Batumi.</p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs">© {new Date().getFullYear()} PetVet Georgia. All rights reserved.</div>
    </footer>
  );
}
