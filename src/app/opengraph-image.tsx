import { ImageResponse } from "next/og";

export const alt = "Масло Плюс — замена масла и ТО в Чебоксарах";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Пытается загрузить кириллический шрифт для OG-картинки; при неудаче — null (фолбэк на латиницу). */
async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/montserrat/files/montserrat-cyrillic-700-normal.woff",
    );
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await loadFont();
  const hasFont = font !== null;

  const brand = hasFont ? "МаслоПлюс" : "MASLO+";
  const title = hasFont ? "Замена масла и ТО в Чебоксарах" : "Oil change & service in Cheboksary";
  const subtitle = hasFont
    ? "3 точки · прозрачные цены · гарантия"
    : "3 locations · fair prices · warranty";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0c0e11",
        color: "#f6f7f8",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(45deg)",
            background: "#f26419",
          }}
        />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>{brand}</div>
      </div>

      <div
        style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}
      >
        {title}
      </div>

      <div style={{ display: "flex", fontSize: 34, color: "#f26419", fontWeight: 700 }}>
        {subtitle}
      </div>
    </div>,
    {
      ...size,
      fonts: hasFont
        ? [{ name: "Montserrat", data: font as ArrayBuffer, weight: 700, style: "normal" }]
        : [],
    },
  );
}
