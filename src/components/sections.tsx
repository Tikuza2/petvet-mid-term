import { useState } from "react";
import { addDays, format } from "date-fns";
import { toast } from "sonner";
import {
  Ambulance, CalendarDays, Cpu, Download, FileText, HeartPulse, MapPin, Scissors, Search, Star, Stethoscope, Syringe, Bell, Quote, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useBooking } from "@/components/booking";
import { LOCATIONS, SERVICES, TIME_SLOTS, VETS } from "@/lib/data";
import { cn } from "@/lib/utils";
import hero from "@/assets/hero.jpg";
import rocky from "@/assets/rocky.jpg";

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-4xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Hero() {
  const { open } = useBooking();
  const [loc, setLoc] = useState<string>("Tbilisi");
  const [svc, setSvc] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  return (
    <section className="bg-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <ShieldCheck className="size-4" /> Georgia's #1 digital vet clinic
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-6xl">
            Healthcare Your Pet Deserves, <span className="italic text-primary">Made Effortless.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Book top-rated veterinarians in Georgia, manage digital medical passports, and get smart reminders 24/7.
          </p>

          <div className="mt-8 grid gap-2 rounded-2xl bg-card p-2 shadow-soft sm:grid-cols-[1fr_1fr_1fr_auto]">
            <Select value={loc} onValueChange={setLoc}>
              <SelectTrigger className="h-12 rounded-xl border-0 bg-muted"><MapPin className="size-4 text-primary" /><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>{LOCATIONS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={svc} onValueChange={setSvc}>
              <SelectTrigger className="h-12 rounded-xl border-0 bg-muted"><Stethoscope className="size-4 text-primary" /><SelectValue placeholder="Service" /></SelectTrigger>
              <SelectContent>{SERVICES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex h-12 items-center gap-2 rounded-xl bg-muted px-3 text-sm">
                  <CalendarDays className="size-4 text-primary" />
                  <span className={date ? "" : "text-muted-foreground"}>{date ? format(date, "MMM d, yyyy") : "Date"}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={{ before: new Date() }} />
              </PopoverContent>
            </Popover>
            <Button variant="cta" className="h-12" onClick={() => open({ service: svc || undefined, date })}>
              <Search /> Search
            </Button>
          </div>

          <div className="mt-8 inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border bg-card px-5 py-3 text-sm font-medium shadow-soft">
            <span><b className="text-primary">5,000+</b> Happy Pets</span>
            <span className="text-border">|</span>
            <span><b className="text-primary">120+</b> Verified Vets</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1"><b className="text-primary">4.9</b> <Star className="size-4 fill-star text-star" /> Rating</span>
          </div>
        </div>

        <div className="relative">
          <img src={hero} alt="Veterinarian holding a happy golden retriever puppy" width={1024} height={1152} className="aspect-[8/9] w-full rounded-3xl object-cover shadow-lift" />
          <div className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft md:-left-10">
            <span className="grid size-11 place-items-center rounded-xl bg-cta-soft text-cta"><Bell className="size-5" /></span>
            <div>
              <div className="text-sm font-semibold">Vaccine reminder</div>
              <div className="text-xs text-muted-foreground">Rocky · Rabies booster in 3 days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICE_CARDS = [
  { icon: Stethoscope, title: "General Consultation", desc: "Full wellness exams, nutrition advice and preventive care plans.", price: "from 60₾" },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 urgent treatment and rapid triage by experienced specialists.", price: "24/7" },
  { icon: Syringe, title: "Vaccination & Microchipping", desc: "Core vaccines, EU-standard microchips and auto-updated passports.", price: "from 45₾" },
  { icon: Scissors, title: "Pet Grooming", desc: "Bathing, trimming, nail care and coat treatments with gentle hands.", price: "from 50₾" },
];

export function Services() {
  const { open } = useBooking();
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Services" title="Everything your pet needs" sub="From routine checkups to urgent care — handled by verified professionals." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CARDS.map(({ icon: Icon, title, desc, price }) => (
          <button key={title} onClick={() => open({ service: title })} className="group rounded-2xl border bg-card p-6 text-left transition duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-lift">
            <span className="grid size-14 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="font-semibold text-primary">{price}</span>
              <span className="font-medium text-cta opacity-0 transition group-hover:opacity-100">Book →</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function VetCard({ vet }: { vet: (typeof VETS)[number] }) {
  const { open } = useBooking();
  const days = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i + 1));
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string>("");
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:shadow-soft">
      <div className="flex gap-4 p-5">
        <img src={vet.photo} alt={vet.name} loading="lazy" width={816} height={816} className="size-24 rounded-xl object-cover" />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold">{vet.name}</h3>
          <p className="text-sm text-primary">{vet.spec}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{vet.years} yrs experience</span>
            <span className="flex items-center gap-1"><Star className="size-3.5 fill-star text-star" /> {vet.rating.toFixed(1)} ({vet.reviews})</span>
            <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {vet.city}</span>
          </div>
        </div>
      </div>
      <div className="mt-auto border-t bg-muted/50 p-5">
        <div className="mb-3 text-sm font-semibold">Book Time Slot</div>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, i) => (
            <button key={i} onClick={() => { setDay(i); setSlot(""); }} className={cn("rounded-lg border bg-card py-1.5 text-center text-xs transition", day === i ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary")}>
              <div className="opacity-80">{format(d, "EEE")}</div>
              <div className="font-semibold">{format(d, "d")}</div>
            </button>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {TIME_SLOTS.map((t, i) => {
            const taken = (i + day + vet.years) % 4 === 0;
            return (
              <button key={t} disabled={taken} onClick={() => setSlot(t)} className={cn("rounded-lg border bg-card py-1.5 text-xs font-medium transition disabled:line-through disabled:opacity-40", slot === t ? "border-cta bg-cta text-cta-foreground" : "hover:border-primary")}>
                {t}
              </button>
            );
          })}
        </div>
        <Button variant="cta" className="mt-4 w-full" disabled={!slot} onClick={() => open({ vetId: vet.id, date: days[day], time: slot })}>
          {slot ? `Book ${format(days[day], "MMM d")} · ${slot}` : "Pick a time slot"}
        </Button>
      </div>
    </div>
  );
}

export function Vets() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Featured vets" title="Meet our top-rated doctors" sub="Verified, licensed and loved by thousands of pet parents across Georgia." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {VETS.map((v) => <VetCard key={v.id} vet={v} />)}
      </div>
    </section>
  );
}

const HISTORY = [
  { date: "Aug 12, 2026", title: "Annual checkup", note: "Healthy weight 12.4 kg · Dr. Beridze", icon: Stethoscope },
  { date: "May 03, 2026", title: "DHPP vaccine", note: "Batch #A2291 · next due May 2027", icon: Syringe },
  { date: "Jan 18, 2026", title: "Microchip implanted", note: "ID 981 020 004 512 776", icon: Cpu },
  { date: "Nov 09, 2025", title: "Mild skin allergy", note: "Treated with antihistamines", icon: HeartPulse },
];

export function Passport() {
  const [tab, setTab] = useState<"history" | "vaccines">("history");
  const download = () => {
    const text = `PetVet Georgia — Medical Report\n\nRocky · French Bulldog · 2 yrs\nMicrochip: 981 020 004 512 776\n\nUpcoming: Rabies booster — Oct 23, 2026\n\nHistory:\n${HISTORY.map((h) => `- ${h.date}: ${h.title} (${h.note})`).join("\n")}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "rocky-medical-report.pdf";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded");
  };
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Digital Pet Passport</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Your pet's health, in your pocket</h2>
          <p className="mt-4 text-lg text-muted-foreground">Vaccines, treatments and vet notes — always up to date, shareable with any clinic and exportable as a PDF.</p>
          <ul className="mt-6 space-y-3">
            {["Automatic vaccination reminders", "Full medical history timeline", "EU-compatible travel records"].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">✓</span>{t}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-lift md:p-8">
          <div className="flex flex-wrap items-center gap-5">
            <img src={rocky} alt="Rocky the French Bulldog" loading="lazy" width={816} height={816} className="size-24 rounded-2xl object-cover" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Rocky</h3>
              <p className="text-muted-foreground">French Bulldog · 2 yrs · Male</p>
              <p className="mt-1 text-xs text-muted-foreground">Chip ID 981 020 004 512 776</p>
            </div>
            <Button variant="outline" onClick={download}><Download /> PDF report</Button>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-cta-soft p-4">
            <span className="grid size-12 place-items-center rounded-xl bg-cta text-cta-foreground"><Syringe className="size-5" /></span>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Upcoming vaccination</div>
              <div className="font-semibold">Rabies booster · Oct 23, 2026</div>
            </div>
            <span className="rounded-full bg-cta px-3 py-1 text-xs font-semibold text-cta-foreground">in 3 days</span>
          </div>

          <div className="mt-6 flex gap-2 rounded-xl bg-muted p-1">
            {(["history", "vaccines"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("flex-1 rounded-lg py-2 text-sm font-medium capitalize transition", tab === t ? "bg-card shadow-sm" : "text-muted-foreground")}>
                {t === "history" ? "Medical history" : "Vaccines"}
              </button>
            ))}
          </div>

          {tab === "history" ? (
            <ol className="mt-5 space-y-4">
              {HISTORY.map(({ date, title, note, icon: Icon }) => (
                <li key={date} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="size-4" /></span>
                  <div className="flex-1 border-b pb-4">
                    <div className="flex justify-between gap-2"><span className="font-semibold">{title}</span><span className="text-xs text-muted-foreground">{date}</span></div>
                    <p className="text-sm text-muted-foreground">{note}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[["Rabies", "Due Oct 23, 2026", false], ["DHPP", "Valid to May 2027", true], ["Leptospirosis", "Valid to May 2027", true], ["Bordetella", "Valid to Feb 2027", true]].map(([n, s, ok]) => (
                <div key={n as string} className="flex items-center gap-3 rounded-xl border p-3">
                  <FileText className={cn("size-5", ok ? "text-primary" : "text-cta")} />
                  <div><div className="text-sm font-semibold">{n}</div><div className="text-xs text-muted-foreground">{s}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Ana G.", pet: "Max, Labrador", text: "Booked an emergency visit at 2am in under a minute. Dr. Kapanadze saved Max's life. Forever grateful!" },
  { name: "Levan T.", pet: "Mia, Persian cat", text: "The digital passport is brilliant — I never miss a vaccine and travelling to Europe was effortless." },
  { name: "Salome K.", pet: "Bubu, Corgi", text: "Clean clinic, kind doctors and the reminders actually work. Best vet experience we've had in Batumi." },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionHead eyebrow="Testimonials" title="Loved by pet parents" />
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-2xl border bg-card p-7 transition hover:shadow-soft">
            <Quote className="size-8 text-primary" />
            <div className="mt-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-star text-star" />)}</div>
            <blockquote className="mt-4 text-foreground/90">"{r.text}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-primary-soft font-semibold text-accent-foreground">{r.name[0]}</span>
              <div><div className="font-semibold">{r.name}</div><div className="text-xs text-muted-foreground">{r.pet}</div></div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function PageIntro({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h1 className="text-5xl font-semibold">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}
