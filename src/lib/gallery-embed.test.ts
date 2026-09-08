import { describe, expect, it } from "vitest";
import { getEmbedUrl, isAllowedEmbedUrl } from "./gallery-embed";

describe("getEmbedUrl", () => {
  it("строит RuTube embed из id", () => {
    expect(getEmbedUrl({ provider: "rutube", id: "abc123" })).toBe(
      "https://rutube.ru/play/embed/abc123",
    );
  });

  it("строит VK Видео embed из owner/id", () => {
    const url = getEmbedUrl({ provider: "vk", ownerId: "-123", id: "456" });
    expect(url).toContain("https://vk.com/video_ext.php?");
    expect(url).toContain("oid=-123");
    expect(url).toContain("id=456");
  });
});

describe("isAllowedEmbedUrl", () => {
  it("разрешает VK и RuTube по https", () => {
    expect(isAllowedEmbedUrl("https://vk.com/video_ext.php?oid=-1&id=2")).toBe(true);
    expect(isAllowedEmbedUrl("https://rutube.ru/play/embed/x")).toBe(true);
    expect(isAllowedEmbedUrl("https://vkvideo.ru/video-1_2")).toBe(true);
  });

  it("блокирует чужие домены и не-https", () => {
    expect(isAllowedEmbedUrl("https://www.youtube.com/embed/x")).toBe(false);
    expect(isAllowedEmbedUrl("http://vk.com/video_ext.php")).toBe(false);
    expect(isAllowedEmbedUrl("https://evil.com/vk.com")).toBe(false);
    expect(isAllowedEmbedUrl("not a url")).toBe(false);
  });

  it("не пропускает домен-подделку с суффиксом", () => {
    expect(isAllowedEmbedUrl("https://vk.com.evil.ru/x")).toBe(false);
  });
});
