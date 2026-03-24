export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
}

export function getModelCode(text: string) {
  const match = text.match(/[A-Z]{1,5}[A-Z0-9-]{1,}/);
  return match?.[0] ?? "Liên hệ để nhận mã";
}

export function getWattage(text: string) {
  const match = text.match(/\d+(?:\.\d+)?\s?W/i);
  return match?.[0].toUpperCase() ?? "Nhiều lựa chọn công suất";
}

export function absoluteUrl(path = "") {
  return new URL(path || "/", "https://asialighting.vn").toString();
}

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();
}
