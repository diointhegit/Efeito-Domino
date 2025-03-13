import { AddGoal } from "@/components/add-goal";
import { Goals } from "@/components/goals";
import { getGoals, getUid } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/server";
import { FaPlus } from "react-icons/fa";

export default async function Page() {
  const supabase = createClient();
  const uid = await getUid(supabase);
  const goals = await getGoals(supabase, uid);
  return (
    <div className="px-5 flex flex-col items-center text-left md:block md:px-20">
      <div className="flex">
        <h1 className="text-4xl">Metas</h1>{" "}
      </div>
      <p>
        Uma meta é o principal motivador! Lembre-se pelo quê você está tentando
        melhorar{" "}
      </p>
      <AddGoal />
      <Goals />
    </div>
  );
}
