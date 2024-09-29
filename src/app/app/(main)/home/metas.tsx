import { GoalProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

const getGoals = async (id: string | undefined) => {
  const { data, error } = await supabase
    .from("goals")
    .select()
    .eq("userid", id);
  if (error) {
    return error;
  }
  return data;
};

export const Goals = async () => {
  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  const goals = (await getGoals(uid)) as any[];

  return (
    <div>
      <div className="flex gap-10">
        {goals.map((goal) => {
          return <GoalCard goal={goal} key={goal.id} />;
        })}
      </div>
    </div>
  );
};

export const GoalCard = ({ goal }: { goal: GoalProps }) => {
  const balance = Number(goal.goalValue) - Number(goal.spentValue);

  return (
    <div>
      <div className="h-32 w-[320px]  bg-primary grid  px-5 py-2 rounded-xl text-light-text">
        <p className="text-xl"> {goal.name} </p>
        <p className="text-3xl font-bold">
          {" "}
          R$ {String(Number(goal.spentValue).toFixed(2).replace(".", ","))}{" "}
        </p>
        <p>
          Sua meta é de: R${" "}
          {String(Number(goal.goalValue).toFixed(2).replace(".", ","))}
        </p>
        <p
          className={cn(
            "text-xs",
            balance >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {balance >= 0 ? "+ " : "- "}R${" "}
          {String(Number(balance).toFixed(2).replace(".", ","))}
        </p>
      </div>
    </div>
  );
};
