"use client";

import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";

const Settings = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setMessage("Password updated successfully");
      setError("");
      setNewPassword("");
      setPassword("");
    } catch (error) {
      setError("Failed to update password. " + error.message);
      setMessage("");
    }
  };

  return (
    <div className="flex bg-[#f2f2f2] h-full min-h-[100vh]">
      <Sidebar />
      <div className="w-full mx-auto mt-0 shadow-lg w-full">
        <div className="bg-white px-4 py-4 drop-shadow">
          <h1 className="text-2xl font-bold text-gray-800">Setting</h1>
        </div>

        <div className="p-8 m-8 min-h-[85vh] rounded-lg bg-[#ffff]">
          <div className="mb-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              value={userEmail || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <form onSubmit={handlePasswordUpdate}>
            <div className="mb-6">
              <label className="block text-gray-700">Current Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-[#159407] hover:bg-[#2da800] text-white font-bold py-2 px-4 rounded"
              >
                Update Password
              </button>
            </div>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;