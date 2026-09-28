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
    <section className="min-h-screen bg-forestGreen flex flex-col gap-6 items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[420px] text-center">
        <Image src={img.Logo} alt="Dover Logo" quality={100} priority={true} />
        <h1 className="font-semibold text-white text-lg tracking-wide">
          Sign In
        </h1>
      </div>

      <div className="bg-white px-6 py-8 w-full max-w-[420px] rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-1"
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
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-1"
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
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-forestGreen text-white w-full rounded-md p-2.5 mt-2 font-medium hover:bg-[#025E50] transition-colors shadow-sm disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
          {errors.form && (
            <p className="text-red-500 text-sm text-center">{errors.form}</p>
          )}
        </form>
      </div>

      <div>
        <p className="text-white/80 text-sm sm:text-base">
          Don&apos;t have an Account?{" "}
          <Link href={"/signup"} className="text-orange font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
