import { AddControl } from "@/components/add-control";
import { Controls } from "@/components/controls";
import { BiPlus } from "react-icons/bi";

export default async function Page() {
  return (
    <div className="px-7 space-y-5">
      <h1 className="text-3xl">Controles</h1>
      <h2 className="text-2xl">
        Quando você reconhece seus gastos, você consegue controlar eles melhor
      </h2>

      <AddControl />

      <div>
        <h1 className="text-2xl">Meus controles</h1>
        <Controls />
      </div>
    </div>
  );
}
