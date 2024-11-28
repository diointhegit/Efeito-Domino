import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/app/home");
  return (
    <div className="h-screen">
      {" "}
      Efeito Dominó
      <p>O melhor app para começar sua responsabilidade financeira</p>
      <div className="grid">
        <Link href="app/login">Clique aqui para fazer Login</Link>
        <Link href={"app/register"}>Clique aqui para entrar na sua conta</Link>
      </div>
    </div>
  );
}
