"use client";

import { img } from "@/assets/index";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpValidation } from "@/lib/zodrules";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    discipline: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validate with Zod
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = SignUpValidation.safeParse(form);

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

    /* Split the confirm password not to store on the DB */
    const { ...formToSubmit } = form;

    /* API POST call to DB */
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToSubmit),
    });

    const result = await response.json();

    /* Toast Handler */
    if (response.ok) {
      toast.success(result.message);

      router.push("/");

      setForm({
        name: "",
        email: "",
        discipline: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="min-h-screen bg-forestGreen flex flex-col gap-6 items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[440px] text-center">
        <Image src={img.Logo} alt="Dover Logo" quality={100} priority={true} />
        <h1 className="font-semibold text-white text-lg tracking-wide">
          Sign Up
        </h1>
      </div>

      <div className="bg-white px-6 py-8 w-full max-w-[440px] rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} method="POST" className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={form.name}
              required
              placeholder="First and Last Name"
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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
              value={form.email}
              onChange={handleChange}
              required
              placeholder="name@doverengineering.com"
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="discipline"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Discipline
            </label>
            <select
              name="discipline"
              id="discipline"
              onChange={handleChange}
              value={form.discipline}
              required
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            >
              <option value="">Select Discipline</option>
              <option value="Reception">Reception</option>
              <option value="IT/IS">IT/IS</option>
              <option value="Project Management & Controls">
                Project Controls & Management
              </option>
              <option value="Mechanical">Mechanical</option>
              <option value="Telecoms">Telecoms</option>
              <option value="Instrumentation">Instrumentation</option>
              <option value="QA/QC">QA/QC</option>
              <option value="Document Control">Document Control</option>
              <option value="Technical Safety">Technical Safety</option>
              <option value="Process">Process</option>
              <option value="Electrical">Electrical</option>
              <option value="Piping">Piping</option>
              <option value="Pipeline">Pipeline</option>
              <option value="Civil/Structural">Civil/Structural</option>
              <option value="HR">HR</option>
              <option value="Accounts">Accounts</option>
              <option value="Business Development">
                Business Development
              </option>
              <option value="Logistics/Procurement">
                Logistics/Procurement
              </option>
              <option value="HSE">HSE</option>
            </select>
            {errors.discipline && (
              <p className="text-red-500 text-sm mt-1">{errors.discipline}</p>
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
              onChange={handleChange}
              value={form.password}
              required
              placeholder="Password"
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword}
              required
              placeholder="Re-type Password"
              className="w-full border border-slate-300 rounded-md shadow-sm p-2.5 focus:outline-none focus:ring-2 focus:ring-forestGreen/30 focus:border-forestGreen transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-forestGreen text-white w-full rounded-md p-2.5 mt-2 font-medium hover:bg-[#025E50] transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div>
        <p className="text-white/80 text-sm sm:text-base">
          Already have an account?{" "}
          <Link href={"/"} className="text-orange font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
