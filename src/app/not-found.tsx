import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className=" space-y-11 w-2/4 border border-1 border-black p-10 rounded-md shadow-xl">
        <div>
          <h2 className="text-2xl">Opa! O famoso 404 existe aqui também</h2>
          <p className="text-lg">
            Esse link que você tentou entrar não existe :p
            <br />
            Mas a culpa não é sua, vamos resolver!
            <br />
            Várias coisas podem ter ocasionado esse problema, iremos verificar
            tudinho, você pode entrar em contato com a equipe e reportar esse
            erro pra ajudar nosso app a se tornar melhor!
          </p>
        </div>

        <div className="space-y-5">
          <p>
            Desculpa pelo transtorno, mas vamos te mandar agora pra uma página
            que existe e você conhece, okay?
          </p>
          <div className="flex justify-evenly">
            <Link
              href="/"
              className="border-1 bg-primary text-light-text border px-5 py-2 rounded-md hover:bg-light-bg hover:text-dark-text hover:border-primary"
            >
              Início
            </Link>
            <Link
              href="/app"
              className="border-1 bg-primary text-light-text border px-5 py-2 rounded-md hover:bg-light-bg hover:text-dark-text hover:border-primary"
            >
              Abrir o APP
            </Link>
            <Link
              href="/app/login"
              className="border-1 bg-primary text-light-text border px-5 py-2 rounded-md hover:bg-light-bg hover:text-dark-text hover:border-primary"
            >
              Fazer seu login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
