"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/"); // Redirect to home if user is already logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Delay the router interaction until the promise resolves
      if (userCredential.user) {
        router.push("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Additional check to handle edge cases or further delays
  useEffect(() => {
    if (auth.currentUser) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-lg font-bold mb-4">Log In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Log In
          </button>
        </form>
        <p className="mt-4">
          Dont have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
