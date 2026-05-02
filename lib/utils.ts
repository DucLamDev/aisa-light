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
  // Try common Asia Lighting model patterns: OTG24-01, COS-10W, AT3-15, SMD1-10W, W-DOB, etc.
  const patterns = [
    /([A-Z]{2,}[0-9]*[-][A-Z0-9]+(?:[-][A-Z0-9]+)*)/,  // OTG24-01, COS-10W
    /([A-Z]{2,}[0-9]+)/,                                  // AT315, SMD110
    /([A-Z]{1,5}[A-Z0-9-]{2,})/,                          // General uppercase pattern
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[0] && match[0].length >= 3) return match[0];
  }
  return "Liên hệ để nhận mã";
}

export function getWattage(text: string) {
  const match = text.match(/(\d+(?:\.\d+)?)\s?[wW]/);
  if (match) return `${match[1]}W`;
  return "Nhiều lựa chọn công suất";
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
