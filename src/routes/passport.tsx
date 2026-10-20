import { createFileRoute } from "@tanstack/react-router";
import { Passport } from "@/components/sections";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Digital Pet Passport — PetVet Georgia" },
      { name: "description", content: "Keep vaccines, medical history and vet notes in one digital passport with PDF export." },
      { property: "og:title", content: "Digital Pet Passport — PetVet Georgia" },
      { property: "og:description", content: "Vaccines, history and reminders in one digital passport." },
    ],
  }),
  component: Passport,
});
