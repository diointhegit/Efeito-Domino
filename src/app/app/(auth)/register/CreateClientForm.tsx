"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";

// Esquema de validação com Zod
const userSchema = z.object({
  name: z.string().min(1, "Nome precisa estar preenchido"),
  birthdate: z.string().min(10, "Data de nascimento inválida"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

interface CreateUserFormProps {
  onSubmit: (fd: FormData) => Promise<void>;
}

export const CreateUserForm = ({ onSubmit }: CreateUserFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleFormSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("birthdate", data.birthdate);
    formData.append("email", data.email);
    formData.append("password", data.password);

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="grid space-y-5 text-left px-10">
      <div className="grid">
        <label htmlFor="name" className="text-xl">Nome</label>
        <input
          {...register("name")}
          type="text"
          name="name"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.name && <p>{`${errors.name.message}`}</p>}
      </div>

      <div className="grid">
        <label htmlFor="birthdate" className="text-xl">Data de Nascimento</label>
        <input
          {...register("birthdate")}
          type="date"
          name="birthdate"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.birthdate && <p>{`${errors.birthdate.message}`}</p>}
      </div>

      <div className="grid">
        <label htmlFor="email" className="text-xl">Email</label>
        <input
          {...register("email")}
          type="email"
          name="email"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.email && <p>{`${errors.email.message}`}</p>}
      </div>

      <div className="grid">
        <label htmlFor="password" className="text-xl">Senha</label>
        <input
          {...register("password")}
          type="password"
          name="password"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.password && <p>{`${errors.password.message}`}</p>}
      </div>

      <button
        type="submit"
        className="border-light-bg border-2 hover:bg-light-bg hover:outline text-light-text grid place-items-center hover:text-dark-text outline-1 px-5 text-center h-12 transition-all ease-in-out"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        Criar Usuário
      </button>
    </form>
  );
};
