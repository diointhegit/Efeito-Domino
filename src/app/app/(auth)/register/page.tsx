"use client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateUserForm } from "./CreateClientForm";
import Link from "next/link";
import { motion } from "motion/react";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="md:w-[350px] mx-5 w-auto shadow-2xl bg-primary border-dark-bg border-2  py-10 rounded-md text-light-text transition-height delay-100 ease-in-out"
    >
      <h1 className="text-4xl text-center mb-5 text-light-text font-bold">
        Cadastro
      </h1>
      <CreateUserForm />
      <div className="flex justify-center pt-7">
        <Link
          href={"/app/login"}
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
        >
          {" "}
          Perai... Eu já tenho uma conta!{" "}
        </Link>
      </div>
    </motion.div>
  );
}
