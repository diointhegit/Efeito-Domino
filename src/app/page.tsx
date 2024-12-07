import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="">
      <div className=" flex  items-center  justify-around w-screen px-20 pt-12 lg:pl-12 ">
        <div className="flex items-center gap-5">
          <Image src="/game.svg" width={50} height={50} alt="3 dominos" />
          <p>Efeito Dominó</p>
        </div>
      </div>
      <div className="md:flex-row h-[90vh]  justify-center flex gap-10 w-screen flex-col-reverse  lg:px-0 items-center  ">
        <Image
          src="/lets be financially responsible.png"
          height={500}
          width={500}
          alt="man happy by paying bills on time, meme created by @raxdflipnote"
        />
        <div className="md:block md:text-left grid place-items-center text-center">
          <h1 className="md:text-6xl text-4xl">Efeito Dominó</h1>
          <p className="text-2xl mt-5">
            O que você precisa pra se tornar responsável financeiramente
          </p>
          <Link href="app/login">
            <button className="text-2xl mt-4 rounded  text-light-text bg-primary px-5 py-3 hover:text-black hover:bg-white hover:outline-primary hover:outline hover:outline-2 transition-colors ease-in-out duration-150">
              Comece agora
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-20  m-0  lg:px-32 md:px-7 px-4 bg-primary text-light-text py-12">
        <h2 className="text-5xl my-10">O que é o Efeito Dominó?</h2>
        <p className=" text-left text-2xl md:w-2/3">
          Efeito Dominó é focado em apoiar os jovens que possuem a
          responsabilidade financeira como objetivo. Durante a juventude surgem
          dilemas em relação ao dinheiro e a organização acaba ficando em
          segundo plano, de modo que o imediatismo para gastar sem pensar no
          amanhã gera um <b> efeito dominó</b>
        </p>
        <div className="mt-20">
          <h2 className="text-4xl py-4 font-bold">Aplicativo</h2>
          <p className="text-2xl ">
            Nós contamos com um aplicativo que te auxilia a organizar suas
            finanças! Com a possibilidade de planejar seus gastos mensais e
            evitar que você perca prazos
            <br />
            Lá você vai poder organizar seus recebimentos, despesas, e ver
            panoramas de seus gastos e quanto você vai ficar no final do mês
          </p>
        </div>
        <div className="mt-20">
          <h2 className="text-4xl py-4 font-bold">Educativo</h2>
          <p className="text-2xl ">
            Temos também artigos sobre educação financeira! Nosso aplicativo vai
            te ajudar, além de se organizar, saber como lidar com a recém ganha
            organização, de forma que sua organização além de te impedir de ter
            prejuízos, te ajude a ter ganhos.
          </p>
        </div>
      </div>
    </main>
  );
}
