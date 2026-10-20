import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Testimonials } from "@/components/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — PetVet Georgia" },
      { name: "description", content: "PetVet Georgia connects pet parents with trusted veterinarians across Georgia." },
      { property: "og:title", content: "About Us — PetVet Georgia" },
      { property: "og:description", content: "Our mission: effortless, trusted pet healthcare in Georgia." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro title="About PetVet Georgia" sub="We started in Tbilisi in 2021 with one goal: make great pet healthcare effortless for every family in Georgia." />
      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-12 sm:grid-cols-3">
        {[["5,000+", "Happy pets"], ["120+", "Verified vets"], ["4.9 ★", "Average rating"]].map(([n, l]) => (
          <div key={l} className="rounded-2xl border bg-card p-8 text-center">
            <div className="font-display text-4xl font-semibold text-primary">{n}</div>
            <div className="mt-2 text-muted-foreground">{l}</div>
          </div>
        ))}
      </section>
      <Testimonials />
    </>
  );
}
