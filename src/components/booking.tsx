import { createContext, useContext, useState, type ReactNode } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PETS, SERVICES, TIME_SLOTS, VETS } from "@/lib/data";

type Prefill = { vetId?: string; service?: string; date?: Date; time?: string };
const Ctx = createContext<{ open: (p?: Prefill) => void }>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

const STEPS = ["Pet", "Service", "Date & Time", "Contact"];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [pet, setPet] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [vetId, setVetId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  const open = (p: Prefill = {}) => {
    setStep(0);
    setPet("");
    setService(p.service ?? "");
    setVetId(p.vetId ?? "");
    setDate(p.date);
    setTime(p.time ?? "");
    setOpen(true);
  };

  const canNext = [!!pet, !!service, !!date && !!time, contact.name.trim().length > 1 && contact.phone.trim().length > 5][step];

  const confirm = () => {
    const vet = VETS.find((v) => v.id === vetId);
    setOpen(false);
    toast.success("Appointment confirmed! 🐾", {
      description: `${PETS.find((p) => p.id === pet)?.name} · ${service}${vet ? ` with ${vet.name}` : ""} · ${date ? format(date, "EEE, MMM d") : ""} at ${time}`,
    });
  };

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Book an appointment</DialogTitle>
            <DialogDescription>Step {step + 1} of 4 — {STEPS[step]}</DialogDescription>
          </DialogHeader>

          <div className="flex gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-muted")} />
            ))}
          </div>

          <div className="min-h-[260px] py-2">
            {step === 0 && (
              <div className="grid gap-3">
                {PETS.map((p) => (
                  <Choice key={p.id} active={pet === p.id} onClick={() => setPet(p.id)}>
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="text-left">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.kind}</div>
                    </div>
                  </Choice>
                ))}
                <button className="flex items-center justify-center gap-2 rounded-xl border border-dashed p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary" onClick={() => toast("Adding new pets is coming soon")}>
                  <Plus className="size-4" /> Add another pet
                </button>
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-3">
                {[...SERVICES, "Emergency Care", "Pet Grooming"].map((s) => (
                  <Choice key={s} active={service === s} onClick={() => setService(s)}>
                    <span className="font-medium">{s}</span>
                  </Choice>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={{ before: new Date() }} className="rounded-xl border p-2" />
                <div className="grid grid-cols-3 content-start gap-2 sm:grid-cols-2">
                  {TIME_SLOTS.map((t) => (
                    <button key={t} onClick={() => setTime(t)} className={cn("rounded-lg border px-2 py-2 text-sm font-medium transition", time === t ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-4">
                <Field label="Full name" value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} placeholder="Ana Gelashvili" />
                <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+995 5XX XX XX XX" />
                <Field label="Email (optional)" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="ana@example.ge" />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
              <ChevronLeft /> Back
            </Button>
            {step < 3 ? (
              <Button disabled={!canNext} onClick={() => setStep(step + 1)}>
                Next <ChevronRight />
              </Button>
            ) : (
              <Button variant="cta" disabled={!canNext} onClick={confirm}>
                <Check /> Confirm booking
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} className={cn("flex items-center gap-3 rounded-xl border p-4 transition", active ? "border-primary bg-primary-soft" : "hover:border-primary/60")}>
      {children}
      {active && <Check className="ml-auto size-5 text-primary" />}
    </button>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input className="h-11 rounded-xl" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
