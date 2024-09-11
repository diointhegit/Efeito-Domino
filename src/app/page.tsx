import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="flex w-screen justify-center gap-10 items-center pt-28">
        <div className="w-[500px]">
          <h1 className="text-6xl">Efeito Dominó</h1>
          <p className="text-2xl mt-5">
            O que você precisa pra se tornar responsável financeiramente
          </p>
          <button className="text-2xl mt-4 rounded  text-light-text bg-primary px-5 py-3 hover:text-black hover:bg-white hover:outline-primary hover:outline hover:outline-2 transition-colors ease-in-out ">
            Comece agora
          </button>
        </div>
        <div className="">
          <Image
            src="/lets be financially responsible.png"
            height={500}
            width={500}
            alt="man happy by paying bills on time"
          />
        </div>
      </div>
      <div className="mt-20 px-10">
        <h2 className="text-4xl mb-5">Aplicativo</h2>
        <p className=" text-left text-xl">
          Nós contamos com um aplicativo que te auxilia a organizar suas
          finanças! Com a possibilidade de planejar seus gastos mensais e evitar
          que você perca prazos
        </p>
      </div>
    </main>
  );
}
