import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateUserForm } from "./CreateClientForm";

export default async function Page() {
  async function handleCreateUser(fd: FormData) {
    "use server";

    const supabase = createClient();

    // Cria o usuário na tabela padrão do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    if (authError) {
      console.error("Erro ao criar autenticação:", authError);
      // redirect("/error");
    }

    // Se o usuário foi criado, insere o nome e data de nascimento na tabela 'user'
    if (authData.user) {
      const { error: userError } = await supabase.from("user").insert([
        {
          user_id: authData.user.id, // Relaciona com a tabela de autenticação
          name: fd.get("name") as string,
          birthdate: fd.get("birthdate") as string,
          balance: 0,
        },
      ]);

      if (userError) {
        console.error("Erro ao criar usuário:", userError);
        return;
        redirect("/error");
      }

      revalidatePath("/"); // Revalida o cache (se necessário)
      redirect("/app/login"); // Redireciona para a página de login
    }
  }

  return (
    <div className="w-[350px] shadow-2xl bg-primary border-dark-bg border-2 py-10 rounded-md text-light-text">
      <h1 className="text-4xl text-center mb-5 text-light-text font-bold">
        Criar Usuário
      </h1>
      <CreateUserForm onSubmit={handleCreateUser} />
    </div>
  );
}
