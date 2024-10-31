import { getGoals, getUid } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/server";
import { FaPlus } from "react-icons/fa";

export default async function Page() {
  const supabase = createClient();
  const uid = await getUid(supabase);
  const goals = await getGoals(supabase, uid);
  console.log(goals);
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
