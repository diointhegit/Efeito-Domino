import { supabase } from "@/supabase/config";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  async function handleLogin(fd: FormData) {
    "use server";

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: fd.get("email") as string,
    //   password: fd.get("password") as string,
    // });
    // if (error) {
    //   redirect("/error");
    // }
    // console.log(data);
    // revalidatePath("/", "layout");
    // redirect("/login");

    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
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
    <div className=" w-1/3 bg-light-bg py-10 rounded-2xl">
      <h1 className="text-4xl text-center ">Login</h1>
      <form action={handleLogin} className="grid space-y-5 text-left px-10">
        <div className="grid ">
          <label htmlFor="" className="text-xl">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="outline outline-1 outline-black text-lg px-1"
          />
        </div>
        <div className="grid ">
          <label htmlFor="" className="text-xl">
            Senha
          </label>
          <input
            type="password"
            name="password"
            className="outline outline-1 outline-black text-lg px-1"
          />
        </div>
        <button className=" bg-dark-bg hover:bg-light-bg hover:outline text-light-text grid place-items-center hover:text-dark-text outline-dark-bg outline-1 px-5 text-center h-12 transition-all ease-in-out">
          Login
        </button>
        <p className="">
          Não tem uma conta? <Link href="/register"> Cadastre-se </Link>
        </p>
      </form>
    </div>
  );
}
