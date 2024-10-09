import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

import User from "../assets/user.png";
import Home from "../assets/home.svg";
import Logout from "../assets/logout.svg";
import Bill from "../assets/bills.svg";
import Users from "../assets/users.svg";
import Setting from "../assets/setting.svg";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <div className="bg-[#11101D] w-[17rem] h-[100vh] flex flex-col items-start justify-start">
      <div className="flex items-center h-[6rem] w-full px-4 bg-[#1D1B31]">
        <Image
          className="mr-4 rounded-full"
          src={User}
          alt="logo"
          width={45}
          height={45}
        />
        <div className="text-white font-medium text-xl">User</div>
      </div>

      <div className="w-full flex flex-col items-start justify-start h-auto mt-[2rem] gap-4">
        <Link
          className="h-[3rem] w-[16.8rem] pl-6 flex items-center justify-start hover:bg-[#1D1B31]"
          href="/"
        >
          <Image
            className="mr-4"
            src={Home}
            alt="logo"
            width={30}
            height={30}
          />
          <span className="text-white p-2 font-normal text-[1.2rem]">Home</span>
        </Link>

        <Link
          className="h-[3rem] w-[16.8rem] pl-6 flex items-center justify-start hover:bg-[#1D1B31]"
          href="/all-bills"
        >
          <Image
            className="mr-4"
            src={Bill}
            alt="logo"
            width={30}
            height={30}
          />
          <span className="text-white p-2 font-normal text-[1.2rem]">
            All Bills
          </span>
        </Link>

        <Link
          className="h-[3rem] w-[16.8rem] pl-6 flex items-center justify-start hover:bg-[#1D1B31]"
          href="/all-clients"
        >
          <Image
            className="mr-4"
            src={Users}
            alt="logo"
            width={30}
            height={30}
          />
          <span className="text-white p-2 font-normal text-[1.2rem]">
            All Clients
          </span>
        </Link>

        <Link
          className="h-[3rem] w-[16.8rem] pl-6 flex items-center justify-start hover:bg-[#1D1B31]"
          href="/setting"
        >
          <Image
            className="mr-4"
            src={Setting}
            alt="logo"
            width={30}
            height={30}
          />
          <span className="text-white p-2 font-normal text-[1.2rem]">
            Setting
          </span>
        </Link>
      </div>

      <div onClick={handleLogout} className="absolute bottom-[0px] flex items-center h-auto w-[16.8rem] pl-6 p-4 cursor-pointer bg-[#1D1B31] mt-[3rem]">
        <Image
          className="mr-4 "
          src={Logout}
          alt="logo"
          width={25}
          height={25}
        />
        <div className="text-white font-normal text-[1.2rem]">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
