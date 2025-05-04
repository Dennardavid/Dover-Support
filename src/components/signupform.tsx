import { img } from "@/assets/index";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <section className="min-h-screen bg-forestGreen flex flex-col gap-6 items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-[500px] text-center">
        <Image src={img.Logo} alt="Dover Logo" quality={100} priority={true} />
        <h1 className="font-semibold text-gray text-xl bg-orange w-full p-2 rounded-md">
          Sign Up
        </h1>
      </div>
      <form action="" className="bg-gray p-6 w-full max-w-[500px] rounded-md">
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
          placeholder="David Dennar"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen placeholder-opacity-50"
        />

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
          placeholder="daviddennar@doverengineering.com"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen placeholder-opacity-50"
        />

        <label
          htmlFor="discipline"
          className="block text-base font-medium text-gray-700 my-2"
        >
          Discipline
        </label>
        <select
          name="discipline"
          id="discipline"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
        >
          <option value="">Reception</option>
          <option value="">IT/IS</option>
          <option value="">Mechanical</option>
          <option value="">Telecoms</option>
          <option value="">Instrumentation</option>
          <option value="">QA/QC</option>
          <option value="">Document Control</option>
          <option value="">Technical Safety</option>
          <option value="">Process</option>
          <option value="">Electrical</option>
          <option value="">Piping</option>
          <option value="">Pipeline</option>
          <option value="">Civil/Structural</option>
          <option value="">HR</option>
          <option value="">Accounts</option>
          <option value="">Business Development</option>
          <option value="">Logistics/Procurement</option>
          <option value="">HSE</option>
        </select>

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
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
        />

        <label
          htmlFor="confirmpassword"
          className="block text-base font-medium text-gray-700 my-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          placeholder="Re-type Password"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
        />
        <button
          type="submit"
          className="bg-forestGreen text-gray w-full rounded-md p-2 mt-5 hover:cursor-pointer shadow-md"
        >
          Sign Up
        </button>
      </form>
      <div>
        <p className="text-gray text-sm sm:text-base">
          Already have an account?{" "}
          <Link href={"/"} className="text-orange underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
