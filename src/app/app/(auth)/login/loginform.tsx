"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha precisa estar prenchida"),
});

export const LoginForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (FormData: FieldValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: FormData.email,
      password: FormData.password,
    });

    if (error) {
      toast.error("Email ou senha errados");
      setHasError(true);
      return;
    } else {
      toast.success("Login com sucesso");
      router.push("/app/home");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid space-y-5 text-left px-10"
    >
      <div className="grid ">
        <label htmlFor="" className="text-xl">
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          name="email"
          className={cn(
            "outline outline-1 outline-black text-lg text-dark-text px-1",
            hasError ? "outline-red-500" : ""
          )}
        />
        {errors.email && <p> {`${errors.email?.message}`}</p>}
      </div>
      <div className="grid ">
        <label htmlFor="" className="text-xl">
          Senha
        </label>
        <input
          type="password"
          {...register("password", {
            minLength: { value: 1, message: "Senha não pode estar vazia" },
          })}
          name="password"
          className={cn(
            "outline outline-1 outline-black text-lg text-dark-text px-1",
            hasError ? "outline-red-500" : ""
          )}
        />
        {errors.password && <p> {`${errors.password.message}`}</p>}
      </div>
      <button
        type="submit"
        className="border-light-bg border-2 hover:bg-light-bg hover:outline text-light-text grid place-items-center hover:text-dark-text outline-1 px-5 text-center h-12 transition-all ease-in-out"
      >
        Entrar
      </button>
      <p className="">
        <Link
          href="register"
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
        >
          Quero criar uma conta!
        </Link>
      </p>
    </form>
  );
};
