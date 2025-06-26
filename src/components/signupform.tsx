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
  const handleSubmit = async (e: any) => {
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
    <section className="min-h-screen bg-forestGreen flex flex-col gap-6 items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-[500px] text-center">
        <Image src={img.Logo} alt="Dover Logo" quality={100} priority={true} />
        <h1 className="font-semibold text-gray text-xl bg-orange w-full p-2 rounded-md">
          Sign Up
        </h1>
      </div>

      <div className="bg-gray p-6 w-full max-w-[500px] rounded-md">
        {/* <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">
            or sign up with email
          </span>
          <hr className="flex-grow border-t border-gray-300" />
        </div> */}
        <form onSubmit={handleSubmit} method="POST">
          <label
            htmlFor="name"
            className="block text-base font-medium text-gray-700 mb-2"
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
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen placeholder-opacity-50"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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
            value={form.email}
            onChange={handleChange}
            required
            placeholder="name@doverengineering.com"
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen placeholder-opacity-50"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <label
            htmlFor="discipline"
            className="block text-base font-medium text-gray-700 my-2"
          >
            Discipline
          </label>
          <select
            name="discipline"
            id="discipline"
            onChange={handleChange}
            value={form.discipline}
            required
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
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
            <option value="Business Development">Business Development</option>
            <option value="Logistics/Procurement">Logistics/Procurement</option>
            <option value="HSE">HSE</option>
          </select>
          {errors.discipline && (
            <p className="text-red-500 text-sm">{errors.discipline}</p>
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
            onChange={handleChange}
            value={form.password}
            required
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <label
            htmlFor="confirmPassword"
            className="block text-base font-medium text-gray-700 my-2"
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
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          <button
            type="submit"
            className="bg-forestGreen text-gray w-full rounded-md p-2 mt-5 hover:cursor-pointer shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div>
        <p className="text-gray text-sm sm:text-base">
          Already have an account?{" "}
          <Link href={"/"} className="text-orange underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
