"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { IoIosPower } from "react-icons/io";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: `${window.location.origin}/` });
    setIsLoading(false);
  };
  return (
    <button
      type="submit"
      disabled={isLoading}
      onClick={() => handleLogout()}
      className="w-full text-white bg-red-500 hover:bg-red-700 rounded-xl py-2 transition flex justify-center items-center gap-2"
    >
      <IoIosPower color="white" fontSize={25} />
      {isLoading ? "Signing Out..." : "Logout"}
    </button>
  );
}
