export const CATEGORY_SUGGESTIONS = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

// Full class names are written out so Tailwind can find them when it scans the code.
const COLORS = [
  { badge: "bg-blue-100 text-blue-700", bar: "bg-blue-500" },
  { badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  { badge: "bg-amber-100 text-amber-700", bar: "bg-amber-500" },
  { badge: "bg-rose-100 text-rose-700", bar: "bg-rose-500" },
  { badge: "bg-violet-100 text-violet-700", bar: "bg-violet-500" },
  { badge: "bg-cyan-100 text-cyan-700", bar: "bg-cyan-500" },
  { badge: "bg-orange-100 text-orange-700", bar: "bg-orange-500" },
  { badge: "bg-fuchsia-100 text-fuchsia-700", bar: "bg-fuchsia-500" },
];

// The same category always gets the same color.
export const getCategoryColor = (category = "") => {
  const key = category.trim().toLowerCase();
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return COLORS[hash % COLORS.length];
};
