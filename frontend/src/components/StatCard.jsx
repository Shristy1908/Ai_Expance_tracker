const StatCard = ({ icon, label, value, hint }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
        <span className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </span>
        {label}
      </div>
      <p className="truncate text-2xl font-bold tabular-nums text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export default StatCard;
