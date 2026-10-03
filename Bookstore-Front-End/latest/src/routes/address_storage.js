// 前端演示储存：接入后端时替换这里的读写逻辑。
const STORAGE_KEY = "book-haven-addresses";
export function readAddresses() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!Array.isArray(stored) || stored.some((item) => !item || typeof item !== "object" || !["id", "Name", "Address", "city", "state", "postcode", "country", "phone_number", "type"].every((key) => typeof item[key] === "string"))) throw new Error("Invalid address data");
  return stored;
}
export function saveAddress(existing, address) {
  // 同一时间只保留一个默认送货地址。
  const updated = address.isDefault ? existing.map((item) => ({ ...item, isDefault: false })) : existing;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated, address]));
}
