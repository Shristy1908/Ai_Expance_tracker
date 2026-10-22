const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="flex w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden flex-col sm:flex-row">
        <div className="flex-1 flex flex-col justify-center gap-2 p-8 sm:p-12 bg-gradient-to-br from-blue-600 to-blue-400 text-white text-center sm:text-left">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <p className="text-sm text-white/85">
            Track where your money goes, one expense at a time.
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
