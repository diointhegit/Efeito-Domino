import { AddControl } from "@/components/add-control";
import { Controls } from "@/components/controls";

export default async function Page() {
  return (
    <div className="px-5 sm:px-20 space-y-5">
      <h1 className="text-3xl">Controles</h1>
      <h2 className="md:text-2xl">
        Quando você reconhece seus gastos, você consegue controlar eles melhor
      </h2>

      <AddControl />

      <div className="grid text-left">
        <h1 className="text-2xl my-2">Meus controles</h1>
        <Controls />
      </div>
    </div>
  );
}
