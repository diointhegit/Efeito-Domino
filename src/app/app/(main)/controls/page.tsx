import { Controls } from "@/components/controls";
import { BiPlus } from "react-icons/bi";

export default async function Page() {
  return (
    <div>
      <h1>Controles</h1>
      <h2>
        Quando você reconhece seus gastos, você consegue controlar eles melhor
      </h2>

      <div className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ">
        <p className="flex items-center gap-2">
          Criar controle <BiPlus />{" "}
        </p>
      </div>

      <div>
        <h1 className="text-2xl">Meus controles</h1>
        <Controls />
      </div>
    </div>
  );
}
