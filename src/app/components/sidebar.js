import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";

import User from "../assets/user.png";
import Home from "../assets/home.svg";
import Logout from "../assets/logout.svg";
import Bill from "../assets/bills.svg";
import Users from "../assets/users.svg";
import Setting from "../assets/setting.svg";

import Logo from "../assets/logo.png";

const Sidebar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Listen for user state changes
    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <div className="bg-[#11101D] w-[90%] max-w-[17rem] h-screen flex flex-col items-start justify-start p-4">
      <div className="flex gap-4 mb-8 flex items-start justify-center">
        <Image src={Logo} width={200} height={150} alt="logo" />
        {/* <h1 className="text-white font-bold text-2xl">ScribeON</h1> */}
      </div>

      <div className="flex items-center w-full mb-8">
        <Image
          className="mr-4 rounded-full"
          src={user?.photoURL || User}
          alt="User Photo"
          width={45}
          height={45}
          layout="fixed"
        />
        <div className="text-white font-medium text-xl truncate">
          {user?.displayName || "User"}
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <Link href="/">
          <span className="flex items-center w-full h-[3rem] px-2 hover:bg-[#1D1B31]">
            <Image src={Home} alt="Home Icon" width={30} height={30} />
            <span className="ml-2 text-white p-2 font-normal text-[1.2rem]">
              Home
            </span>
          </span>
        </Link>

        <Link href="/all-bills">
          <span className="flex items-center w-full h-[3rem] px-2 hover:bg-[#1D1B31]">
            <Image src={Bill} alt="Bills Icon" width={30} height={30} />
            <span className="ml-2 text-white p-2 font-normal text-[1.2rem]">
              All Bills
            </span>
          </span>
        </Link>

        <Link href="/all-clients">
          <span className="flex items-center w-full h-[3rem] px-2 hover:bg-[#1D1B31]">
            <Image src={Users} alt="Clients Icon" width={30} height={30} />
            <span className="ml-2 text-white p-2 font-normal text-[1.2rem]">
              All Clients
            </span>
          </span>
        </Link>

        <Link href="/setting">
          <span className="flex items-center w-full h-[3rem] px-2 hover:bg-[#1D1B31]">
            <Image src={Setting} alt="Setting Icon" width={30} height={30} />
            <span className="ml-2 text-white p-2 font-normal text-[1.2rem]">
              Setting
            </span>
          </span>
        </Link>
      </div>

      <div
        onClick={handleLogout}
        className="mt-auto py-2 px-4 w-full flex items-center justify-start bg-[#1D1B31] hover:bg-[#37334c] rounded-lg cursor-pointer"
      >
        <Image src={Logout} alt="Logout Icon" width={25} height={25} />
        <span className="ml-2 text-white font-normal text-[1.2rem]">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
