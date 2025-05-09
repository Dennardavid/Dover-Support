"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  await signIn("credentials", formData);

  return redirect("/users")
}
