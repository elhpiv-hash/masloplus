import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { policyDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: policyDoc.title,
  description:
    "Политика обработки персональных данных сети автосервисов «Масло Плюс» в соответствии с 152-ФЗ.",
};

export default function PolicyPage() {
  return <LegalDocument doc={policyDoc} />;
}
