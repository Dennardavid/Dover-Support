import { img } from "@/assets/index";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen bg-forestGreen flex flex-col gap-6 items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-[500px] text-center">
        <Image src={img.Logo} alt="Dover Logo" quality={100} priority={true} />
        <h1 className="font-semibold text-gray text-xl bg-orange w-full p-2 rounded-md">
          Login
        </h1>
      </div>
      <form action="" className="bg-gray p-6 w-full max-w-[500px] rounded-md">
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

        <button
          type="submit"
          className="bg-forestGreen text-gray w-full rounded-md p-2 mt-5 hover:cursor-pointer shadow-md"
        >
          Login
        </button>
      </form>
      <div>
        <p className="text-gray text-sm sm:text-base">
          Don't have an Account?{" "}
          <Link href={"/signup"} className="text-orange underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
