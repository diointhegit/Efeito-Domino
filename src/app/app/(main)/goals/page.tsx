import { AddGoal } from "@/components/add-goal";
import { Goals } from "@/components/goals";
import { getGoals, getUid } from "@/lib/supabase-utils";
import { getSupabase } from "@/server-actions/transaction-actions";
import { FaPlus } from "react-icons/fa";

export default async function Page() {
  const supabase = await getSupabase();

  const uid = await getUid(supabase);
  const goals = await getGoals(supabase, uid);
  console.log(goals);

  return (
    <div className="px-5 flex flex-col items-center text-left md:block md:px-20">
      <div className="flex">
        <h1 className="text-4xl">Metas</h1>{" "}
      </div>
      <p>
        Uma meta é o principal motivador! Lembre-se pelo quê você está tentando
        melhorar{" "}
      </p>
      <div className="flex">
        <AddGoal />
      </div>
      <Goals />
    </div>
  );
}
