// Intl formatters are expensive to create, so build them once and reuse them.
const amountFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Dates are stored as UTC midnight, so format in UTC to show the day that was picked.
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "long" });

export const formatAmount = (amount) => amountFormatter.format(Number(amount) || 0);

export const formatDate = (date) => dateFormatter.format(new Date(date));

export const formatMonthName = (date = new Date()) => monthFormatter.format(date);

// First letter, uppercased: used for avatars and category badges.
export const getInitial = (text = "") => text.trim().charAt(0).toUpperCase();

// API date (ISO string) -> YYYY-MM-DD for <input type="date">.
export const toDateInputValue = (date) =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

// Today as YYYY-MM-DD in the user's local time, for <input type="date">.
export const todayInputValue = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};
