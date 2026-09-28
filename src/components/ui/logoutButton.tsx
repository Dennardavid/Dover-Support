"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { IoIosPower } from "react-icons/io";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
    setIsLoading(false);
  };
  return (
    <button
      type="submit"
      disabled={isLoading}
      onClick={() => handleLogout()}
      className="w-full text-white/90 bg-white/10 hover:bg-red-500/90 hover:text-white rounded-lg py-2.5 transition-colors flex justify-center items-center gap-2 text-sm font-medium disabled:opacity-60"
    >
      <IoIosPower fontSize={18} />
      {isLoading ? "Signing Out..." : "Logout"}
    </button>
  );
}
