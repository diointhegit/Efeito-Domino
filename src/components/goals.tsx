import { toBRCurrency } from "@/lib/currency";
import { getBalance, getGoals } from "@/lib/supabase-utils";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { SaveToGoals } from "./add-to-goals";

export const Goals = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  const goals = (await getGoals(supabase, uid)) as [];
  const balance = await getBalance(supabase, uid);
  return (
    <div>
      {goals.length > 0 ? (
        <div className="md:flex gap-10 grid">
          {goals.map((goal: any) => {
            return <GoalCard goal={goal} key={goal.id} balance={balance} />;
          })}
        </div>
      ) : (
        <div className="flex gap-10">Nenhuma meta cadastrada</div>
      )}
    </div>
  );
};

export const GoalCard = ({ goal, balance }: { goal: any; balance: number }) => {
  const getBarWidth = (achievedValue: number, goalValue: number) => {
    return (achievedValue / goalValue) * 100 > 100
      ? 100
      : (achievedValue / goalValue) * 100;
  };
  const barWidth = getBarWidth(goal.achieved_value, goal.goal_value);
  const isOver = goal.achieved_value > goal.goal_value;

  return (
    <div className="px-5">
      <div className="sm:h-40 sm:w-[320px] w-[250px] bg-primary grid px-5 py-2 rounded-xl text-light-text h-52">
        <SaveToGoals goal={goal} balance={balance} />
        <p className="text-3xl"> {goal.name} </p>
        <div className="flex justify-between items-baseline">
          <p className=" text-xs text-green-500">
            {toBRCurrency(goal.achieved_value)}
          </p>

          <p className="">{toBRCurrency(goal.goal_value)}</p>
        </div>

        <div className="h-5 w-full rounded-lg outline-1 outline">
          <div
            style={{
              width: `${barWidth}%`,
            }}
            className={cn(
              "rounded-lg h-5",
              isOver ? "bg-red-500" : "bg-green-500"
            )}
          ></div>
        </div>
      </div>
    </div>
  );
};
