import { FaPlus } from "react-icons/fa";

export default function Page() {
  return (
    <div>
      <div className="flex">
        <h1 className="text-4xl">Metas</h1>{" "}
      </div>
      <p>
        Uma meta é o principal motivador! Lembre-se pelo quê você está tentando
        melhorar{" "}
      </p>
      <div className="flex">
        <h2 className="flex gap-1 items-center text-xs">
          Criar meta <FaPlus />
        </h2>
      </div>
    </div>
  );
}
