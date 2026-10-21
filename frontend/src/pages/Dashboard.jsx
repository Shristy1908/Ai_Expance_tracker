import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
    </div>
  );
}

export default Dashboard;
