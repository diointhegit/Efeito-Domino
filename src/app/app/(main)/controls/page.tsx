import { AddControl } from "@/components/add-control";
import { Controls } from "@/components/controls";
import { BiPlus } from "react-icons/bi";

export default async function Page() {
  return (
    <div>
      <h1>Controles</h1>
      <h2>
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
