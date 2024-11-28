import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./loginform";
import { getSupabase } from "@/server-actions/transaction-actions";

export default async function Page() {
  async function handleLogin(fd: FormData) {
    "use server";

    const supabase = await getSupabase();

    const data = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/home");
  }

  return (
    <div className="w-[350px] shadow-2xl bg-primary border-dark-bg border-2 py-10 rounded-md text-light-text">
      <h1 className="text-4xl text-center mb-5 text-light-text font-bold">
        Entre na sua conta
      </h1>
      <LoginForm />
    </div>
  );
}
