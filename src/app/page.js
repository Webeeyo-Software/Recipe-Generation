"use client";

import useAuth from "./auth/AuthProvider";
import Sidebar from "./components/sidebar";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return null; // Redirect handled by the hook

  return (
    <div className="flex bg-[#f2f2f2] h-full min-h-[100vh]">
      <Sidebar />
      <div className="flex p-10 text-2xl font-bold">
        Welcome to the homepage!
      </div>
    </div>
  );
}
