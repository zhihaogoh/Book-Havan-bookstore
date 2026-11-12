// Return null for missing or invalid dates so those records sort last.
const parseDate = (value) => {
  if (typeof value !== "string" || !value.trim()) return null;

  const parts = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  let timestamp;
  if (parts) {
    const [, day, month, year] = parts.map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) return null;
    timestamp = date.getTime();
  } else {
    timestamp = Date.parse(value);
  }
  return Number.isFinite(timestamp) ? timestamp : null;
};

const newestFirst = (a, b) => {
  const first = parseDate(a);
  const second = parseDate(b);
  if (first === null) return second === null ? 0 : 1;
  if (second === null) return -1;
  return second - first;
};

export const getSortOrders = (orders, limit) =>
  [...orders]
    .sort((a, b) => newestFirst(a.placed_at, b.placed_at))
    .slice(0, limit);

// Books use creation dates, not the order-only placed_at field.
// When the API omits dates, preserve its original order.
export const getNewProduct = (books, limit) =>
  [...books]
    .sort((a, b) => newestFirst(a.created_at, b.created_at))
    .slice(0, limit);
