import { createFileRoute } from "@tanstack/react-router";
import { Hero, Passport, Services, Testimonials, Vets } from "@/components/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetVet Georgia — Book Top Vets in Tbilisi & Batumi" },
      { name: "description", content: "Book top-rated veterinarians in Georgia, manage digital pet passports and get smart reminders 24/7." },
      { property: "og:title", content: "PetVet Georgia — Digital Veterinary Clinic" },
      { property: "og:description", content: "Book vets, manage digital pet passports and get smart reminders 24/7." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Services />
      <Vets />
      <Passport />
      <Testimonials />
    </>
  );
}
