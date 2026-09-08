import { LegalDocument } from "@/components/sections/LegalDocument";
import { policyDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: policyDoc.title,
  description:
    "Политика обработки персональных данных сети автосервисов «Масло Плюс» в соответствии с 152-ФЗ.",
  path: "/policy",
});

export default function PolicyPage() {
  return <LegalDocument doc={policyDoc} />;
}
