import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getDisplayMessage } from "../utils/apiError.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(getDisplayMessage(err, "Registration failed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={handleSubmit}>
        <Alert className="mb-4">{error}</Alert>
        <div className="mb-4 flex flex-col gap-1.5 text-left">
          <label htmlFor="name" className="text-sm font-semibold text-gray-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11 rounded-lg border border-gray-200 px-3.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
          />
        </div>
        <div className="mb-4 flex flex-col gap-1.5 text-left">
          <label htmlFor="email" className="text-sm font-semibold text-gray-500">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 rounded-lg border border-gray-200 px-3.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
          />
        </div>
        <div className="mb-4 flex flex-col gap-1.5 text-left">
          <label htmlFor="password" className="text-sm font-semibold text-gray-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 rounded-lg border border-gray-200 px-3.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white cursor-pointer hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-500">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
