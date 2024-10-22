import { ControlDetails } from "@/components/control-details";
import { getControls } from "@/lib/supabase-utils";
import { controlType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const Controls = async () => {
  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  const controls = (await getControls(supabase, uid)) as any[];
  console.log(controls);

  return (
    <div>
      <div className="flex gap-10">
        {controls.map((control) => {
          return <ControlCard control={control} key={control.id} />;
        })}
      </div>
    </div>
  );
};

export const ControlCard = ({ control }: { control: controlType }) => {
  const balance = Number(control.controlValue) - Number(control.spentValue);

  return (
    <div>
      <div className="h-32 w-[320px]  bg-primary grid  px-5 py-2 rounded-xl text-light-text">
        <div className="flex justify-between">
          <p className="text-xl"> {control.name} </p>
          <ControlDetails control={control} />
        </div>
        <p className="text-3xl font-bold">
          {" "}
          R$ {String(
            Number(control.spentValue).toFixed(2).replace(".", ",")
          )}{" "}
        </p>
        <p>
          Sua meta é de: R${" "}
          {String(Number(control.controlValue).toFixed(2).replace(".", ","))}
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
