"use client";

import { InputErrorMessage } from "@/components/texts/error-text";
import { dateToBRStringDate } from "@/lib/timefns";
import { containsSequentialNumbers } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { differenceInCalendarYears, isFuture, subYears } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";

// Esquema de validação com Zod
const userSchema = z
  .object({
    name: z.string().min(1, "Nome precisa estar preenchido"),
    birthdate: z.string().min(10, "Data de nascimento inválida"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    passwordConfirm: z.string({
      required_error: "Você precisa confirmar a senha",
    }),
  })
  .superRefine(({ passwordConfirm, password, birthdate }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Sua senhas não são iguais",
        path: ["passwordConfirm"],
      });
    }
    const testBirthdate = dateToBRStringDate(birthdate).replaceAll("/", "");
    const fourDigitBirthdate = testBirthdate
      .slice(0, 4)
      .concat(testBirthdate.slice(6, 8));
    const birthdateDayAndMonth = testBirthdate.slice(0, 4);

    if (
      password.includes(testBirthdate) ||
      password.includes(fourDigitBirthdate) ||
      password.includes(birthdateDayAndMonth)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Usar sua data de aniversário na senha é tãaao 2010",
        path: ["password"],
      });
    }

    if (containsSequentialNumbers(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Número em sequência é fácil de acertar sabia?",
        path: ["password"],
      });
    }
    const DATEBirthdate = new Date(birthdate);
    if (isFuture(DATEBirthdate)) {
      ctx.addIssue({
        code: "custom",
        message: "Não conseguimos criar uma conta pra quem não nasceu ainda :(",
        path: ["birthdate"],
      });
    }

    if (differenceInCalendarYears(Date.now(), DATEBirthdate) <= 16) {
      ctx.addIssue({
        code: "custom",
        message: "Você precisa ter ao menos 16 anos pra criar uma conta! ",
        path: ["birthdate"],
      });
    }
  });

interface CreateUserFormProps {
  onSubmit: (
    fd: FormData
  ) => Promise<AuthError | undefined> | AuthError | undefined;
}

export const CreateUserForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();
  const todayDate = new Date().toISOString().slice(0, 10);

  const handleCreateUser = async (fd: any) => {
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: fd.email,
      password: fd.password,
    });

    if (authError) {
      console.log("Erro ao criar autenticação:", authError);
      return authError;
      // redirect("/error");
    }

    // Se o usuário foi criado, insere o nome e data de nascimento na tabela 'user'
    if (authData.user) {
      const { error: userError } = await supabase.from("user").insert([
        {
          user_id: authData.user.id, // Relaciona com a tabela de autenticação
          name: fd.name,
          birthdate: fd.birthdate,
          balance: 0,
        },
      ]);

      if (userError) {
        console.error("Erro ao criar usuário:", userError);
        // redirect("/error");
        return;
      }

      router.push("/app/login"); // Redireciona para a página de login
    }
  };

  const handleFormSubmit = async (data: any) => {
    await handleCreateUser(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid space-y-5 text-left px-10"
    >
      <div className="grid py-2 ">
        <label htmlFor="name" className="text-xl">
          Nome
        </label>
        <input
          {...register("name")}
          type="text"
          name="name"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.name && <InputErrorMessage message={errors.name.message} />}
      </div>
      <div className="grid">
        <label htmlFor="birthdate" className="text-xl">
          Data de Nascimento
        </label>
        <input
          {...register("birthdate")}
          type="date"
          name="birthdate"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />

        {errors.birthdate && (
          <InputErrorMessage message={errors.birthdate.message} />
        )}
      </div>
      <div className="grid">
        <label htmlFor="email" className="text-xl">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          name="email"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.email && <InputErrorMessage message={errors.email.message} />}
      </div>
      <div className="grid">
        <label htmlFor="password" className="text-xl">
          Senha
        </label>
        <input
          {...register("password")}
          type="password"
          name="password"
          className="outline outline-1 outline-black text-lg text-dark-text px-1"
        />
        {errors.password && (
          <InputErrorMessage message={errors.password.message} />
        )}
      </div>{" "}
      <div className="grid ">
        <label htmlFor="passwordConfirm" className="text-xl">
          Confirme a Senha
        </label>
        <input
          {...register("passwordConfirm")}
          type="password"
          name="passwordConfirm"
          className="outline outline-1 outline-black text-lg text-dark-text px-1 "
        />
        {errors.passwordConfirm && (
          <InputErrorMessage message={errors.passwordConfirm.message} />
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="border-light-bg border-2 hover:bg-light-bg hover:outline text-light-text grid place-items-center hover:text-dark-text outline-1 px-5 text-center h-12 transition-all ease-in-out disabled:bg-black"
      >
        {isSubmitting ? "Criando conta..." : "Entrar"}
      </button>
    </form>
  );
};
