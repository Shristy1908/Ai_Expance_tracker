const Alert = ({ children, className = "" }) => {
  if (!children) return null;
  return (
    <p
      role="alert"
      className={`rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 ${className}`}
    >
      {children}
    </p>
  );
};

export default Alert;
