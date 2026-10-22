// Helpers for reading the backend's error shape:
// { success: false, message, errors?: [{ field, message }] }

export const getErrorMessage = (err, fallback = "Something went wrong") =>
  err?.response?.data?.message || fallback;

// [{ field, message }] -> { field: message }, keeping the first message per field.
export const getFieldErrors = (err) => {
  const errors = err?.response?.data?.errors;
  if (!Array.isArray(errors)) return {};
  return errors.reduce((acc, { field, message }) => {
    acc[field] ??= message;
    return acc;
  }, {});
};

// One message for a form without per-field errors: the first field error
// (e.g. "Password must contain a number") is more useful than "Validation failed".
export const getDisplayMessage = (err, fallback) =>
  Object.values(getFieldErrors(err))[0] || getErrorMessage(err, fallback);

export const isNotFound = (err) => err?.response?.status === 404;
