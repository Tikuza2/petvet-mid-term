import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Vets } from "@/components/sections";

export const Route = createFileRoute("/vets")({
  head: () => ({
    meta: [
      { title: "Find Vets — PetVet Georgia" },
      { name: "description", content: "Browse verified veterinarians in Tbilisi and Batumi and book a time slot instantly." },
      { property: "og:title", content: "Find Vets — PetVet Georgia" },
      { property: "og:description", content: "Verified vets in Tbilisi and Batumi with instant booking." },
    ],
  }),
  component: () => (
    <>
      <PageIntro title="Find a Vet" sub="Pick a doctor, choose a free slot and you're booked." />
      <Vets />
    </>
  ),
});
