"use client";

import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../firebaseConfig"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (fileInputRef.current.files[0]) {
        const file = fileInputRef.current.files[0];
        const filePath = `${user.uid}/${file.name}`; // Assuming you have user.uid defined
        const newImageRef = ref(storage, filePath);
    
        try {
          const fileSnapshot = await uploadBytes(newImageRef, file);
          const photoURL = await getDownloadURL(newImageRef);
          setFileUrl(photoURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        console.log("No file selected");
      }

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: fileUrl,
      });

      // Store the new user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        mobile,
        photoURL: fileUrl,
      });

      router.push("/");
    } catch (error) {
      console.error("Firebase error during signup:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-lg font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
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
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          {/* <input
            ref={fileInputRef}
            type="file"
            className="w-full p-2 border rounded"
          /> */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500">Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
