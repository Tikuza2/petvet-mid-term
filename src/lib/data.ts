import vet1 from "@/assets/vet-1.jpg";
import vet2 from "@/assets/vet-2.jpg";
import vet3 from "@/assets/vet-3.jpg";

export const LOCATIONS = ["Tbilisi", "Batumi"] as const;
export const SERVICES = ["General Checkup", "Vaccination", "Dentistry"] as const;

export const VETS = [
  { id: "nino", name: "Dr. Nino Beridze", spec: "Internal Medicine", years: 12, rating: 4.9, reviews: 318, city: "Tbilisi", photo: vet1 },
  { id: "giorgi", name: "Dr. Giorgi Kapanadze", spec: "Surgery & Emergency", years: 17, rating: 4.8, reviews: 402, city: "Tbilisi", photo: vet2 },
  { id: "mariam", name: "Dr. Mariam Lomidze", spec: "Dentistry & Exotics", years: 6, rating: 5.0, reviews: 154, city: "Batumi", photo: vet3 },
];

export const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export const PETS = [
  { id: "rocky", name: "Rocky", kind: "French Bulldog, 2 yrs", emoji: "🐶" },
  { id: "luna", name: "Luna", kind: "British Shorthair, 4 yrs", emoji: "🐱" },
];
