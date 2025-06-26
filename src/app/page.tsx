"use client";

import { img } from "@/assets/index";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { loginValidation } from "@/lib/zodrules";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const parsed = loginValidation.safeParse({ email, password });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      try {
        const parsedError = JSON.parse(result.error);
        console.log(parsedError);
        setErrors({ form: parsedError.message || "Login failed from try" });
      } catch {
        setErrors({ form: "Invalid credentials" });
      }
    } else {
      toast.success("Successful");

      const session = await getSession();

      if (session?.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("users");
      }

      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <section className="min-h-screen bg-forestGreen flex flex-col gap-6 items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-[500px] text-center">
        <Image src={img.Logo} alt="Dover Logo" quality={100} priority={true} />
        <h1 className="font-semibold text-gray text-xl bg-orange w-full p-2 rounded-md">
          Sign In
        </h1>
      </div>

      <div className="bg-gray px-6 py-7 w-full max-w-[500px] rounded-md">
        {/* <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">
          or sign in with email
          </span>
          <hr className="flex-grow border-t border-gray-300" />
          </div> */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-base font-medium text-gray-700 my-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@doverengineering.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen placeholder-opacity-50"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 my-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          <button
            type="submit"
            className="bg-forestGreen text-gray w-full rounded-md p-2 mt-5 hover:cursor-pointer shadow-md"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
          {errors.form && (
            <p className="text-red-500 text-sm mt-2">{errors.form}</p>
          )}
        </form>
      </div>

      <div>
        <p className="text-gray text-sm sm:text-base">
          Don&apos;t have an Account?{" "}
          <Link href={"/signup"} className="text-orange underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
