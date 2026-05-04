import {
  Droplets,
  FileCheck,
  Leaf,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServiceId =
  | "gardening"
  | "electrical"
  | "plumbing"
  | "epc"
  | "solar";

export type ServiceFormValue =
  | "Gardening"
  | "Electrical"
  | "Plumbing"
  | "EPC Survey"
  | "Solar Installation"
  | "Other";

export const SERVICE_FORM_VALUES: ServiceFormValue[] = [
  "Gardening",
  "Electrical",
  "Plumbing",
  "EPC Survey",
  "Solar Installation",
  "Other",
];

export interface ServiceDefinition {
  id: ServiceId;
  title: string;
  formValue: ServiceFormValue;
  description: string;
  duration: string;
  price: string;
  ecoBadge?: boolean;
  icon: LucideIcon;
}

export const services: ServiceDefinition[] = [
  {
    id: "gardening",
    title: "Gardening",
    formValue: "Gardening",
    description:
      "Garden clearance, lawn care, planting, landscaping, hedge trimming",
    duration: "Half day – 2 days",
    price: "From £150",
    icon: Leaf,
  },
  {
    id: "electrical",
    title: "Electrical",
    formValue: "Electrical",
    description:
      "Electrical installation, rewiring, consumer unit upgrades, EV charger fitting",
    duration: "1–3 days",
    price: "From £200",
    icon: Zap,
  },
  {
    id: "plumbing",
    title: "Plumbing",
    formValue: "Plumbing",
    description:
      "Boiler service, pipe repair, bathroom fitting, leak detection, radiators",
    duration: "1–2 days",
    price: "From £150",
    icon: Droplets,
  },
  {
    id: "epc",
    title: "EPC Survey",
    formValue: "EPC Survey",
    description:
      "Energy Performance Certificate required for property sale or rental",
    duration: "2–3 hours",
    price: "£80–£120",
    ecoBadge: true,
    icon: FileCheck,
  },
  {
    id: "solar",
    title: "Solar Installation",
    formValue: "Solar Installation",
    description:
      "Solar panel supply & install, battery storage, ECO scheme eligible, MCS certified",
    duration: "1–2 days",
    price: "From £4,000",
    ecoBadge: true,
    icon: Sun,
  },
];

export function serviceIdToFormValue(id: ServiceId): ServiceFormValue {
  const s = services.find((x) => x.id === id);
  return s?.formValue ?? "Other";
}
