import { LegalDocument } from "@/components/sections/LegalDocument";
import { agreementDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: agreementDoc.title,
  description: "Пользовательское соглашение сайта сети автосервисов «Масло Плюс».",
  path: "/soglashenie",
});

export default function SoglasheniePage() {
  return <LegalDocument doc={agreementDoc} />;
}
