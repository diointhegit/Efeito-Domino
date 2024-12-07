"use client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./loginform";
import { motion } from "motion/react";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-5 shadow-2xl bg-primary border-dark-bg border-2 py-10 rounded-md text-light-text transition-height transition-all duration-1000 "
    >
      <h1 className="text-3xl text-center mb-5  text-light-text font-bold">
        Entre na sua conta
      </h1>
      <LoginForm />
    </motion.div>
  );
}
