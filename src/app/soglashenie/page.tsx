import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { agreementDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: agreementDoc.title,
  description: "Пользовательское соглашение сайта сети автосервисов «Масло Плюс».",
};

export default function SoglasheniePage() {
  return <LegalDocument doc={agreementDoc} />;
}
