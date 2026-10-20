import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Services } from "@/components/sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Veterinary Services — PetVet Georgia" },
      { name: "description", content: "Consultations, 24/7 emergency care, vaccination, microchipping and grooming in Georgia." },
      { property: "og:title", content: "Veterinary Services — PetVet Georgia" },
      { property: "og:description", content: "Consultations, emergency care, vaccines and grooming." },
    ],
  }),
  component: () => (
    <>
      <PageIntro title="Our Services" sub="Complete care for dogs, cats and small pets." />
      <Services />
    </>
  ),
});
