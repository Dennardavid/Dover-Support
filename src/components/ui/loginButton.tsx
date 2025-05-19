"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { TiVendorMicrosoft } from "react-icons/ti";

function LoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("microsoft-entra-id");
    setIsLoading(false);
  };
  return (
    <button
      onClick={() => handleLogin()}
      className="bg-forestGreen text-gray w-full rounded-md p-2 hover:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
      disabled={isLoading}
    >
      <TiVendorMicrosoft size={30} />
      {isLoading ? "Signing in..." : "Login With Microsoft"}
    </button>
  );
}

export default LoginButton;
