import { getCategoryColor } from "../utils/category.js";
import { formatAmount } from "../utils/format.js";

const CategoryBreakdown = ({ byCategory, total, loading }) => {
  return (
    <section className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 font-semibold text-gray-900">By category</h2>
      {byCategory.length === 0 ? (
        <p className="text-sm text-gray-500">
          {loading ? "Loading..." : "Your spending breakdown will appear here."}
        </p>
      ) : (
        <ul className="space-y-4">
          {byCategory.map(({ category, amount }) => {
            const percent = total > 0 ? Math.round((amount / total) * 100) : 0;
            return (
              <li key={category}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{category}</span>
                  <span className="tabular-nums text-gray-500">
                    {formatAmount(amount)} · {percent}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${getCategoryColor(category).bar}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CategoryBreakdown;
