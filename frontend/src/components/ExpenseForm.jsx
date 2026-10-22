import { useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage, getFieldErrors } from "../utils/apiError.js";
import { CATEGORY_SUGGESTIONS } from "../utils/category.js";
import { toExpensePayload } from "../utils/expense.js";
import { todayInputValue } from "../utils/format.js";
import Alert from "./Alert.jsx";

const inputClass =
  "h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15";
const labelClass = "text-sm font-semibold text-gray-700";

const FieldError = ({ message }) => {
  return message ? <p className="text-xs text-red-600">{message}</p> : null;
};

const ExpenseForm = ({ initialValues, onSubmit, submitLabel }) => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));
  const handleChange = (e) => setField(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSubmitting(true);
    try {
      await onSubmit(toExpensePayload(values));
    } catch (err) {
      const byField = getFieldErrors(err);
      setFieldErrors(byField);
      if (byField.body || !Object.keys(byField).length) {
        setError(byField.body || getErrorMessage(err));
      }
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Alert>{error}</Alert>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="amount" className={labelClass}>
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={values.amount}
          onChange={handleChange}
          required
          autoFocus
          className={`${inputClass} h-14 text-2xl font-semibold tabular-nums`}
        />
        <FieldError message={fieldErrors.amount} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_SUGGESTIONS.map((category) => {
            const selected = values.category.trim().toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                onClick={() => setField("category", category)}
                aria-pressed={selected}
                className={`h-8 rounded-full border px-3 text-xs font-medium cursor-pointer transition ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <input
          id="category"
          name="category"
          type="text"
          maxLength={50}
          placeholder="Pick one above or type your own"
          value={values.category}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <FieldError message={fieldErrors.category} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sub-category" className={labelClass}>
            Sub-category <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id="sub-category"
            name="sub-category"
            type="text"
            maxLength={50}
            placeholder="e.g. Lunch"
            value={values["sub-category"]}
            onChange={handleChange}
            className={inputClass}
          />
          <FieldError message={fieldErrors["sub-category"]} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className={labelClass}>
            Date <span className="font-normal text-gray-400">(defaults to today)</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            max={todayInputValue()}
            value={values.date}
            onChange={handleChange}
            className={inputClass}
          />
          <FieldError message={fieldErrors.date} />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="h-11 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-sm font-semibold text-white shadow-md shadow-blue-600/25 cursor-pointer hover:from-blue-700 hover:to-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
        <Link
          to="/dashboard"
          className="flex h-11 items-center rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-gray-700 no-underline hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default ExpenseForm;
