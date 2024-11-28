import { ControlDetails } from "@/components/control-details";
import { getControls } from "@/lib/supabase-utils";
import { controlType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getSupabase } from "@/server-actions/transaction-actions";

type displayTypes = "flex" | "scroll";
export const Controls = async ({
  displayType,
}: {
  displayType?: displayTypes;
}) => {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  const controls = (await getControls(supabase, uid)) as any[];

  return (
    <div className="">
      {controls.length > 0 ? (
        <div className="">
          <div
            className={cn(
              "flex gap-10",
              displayType == "scroll" ? "overflow-x-scroll py-2" : "flex-wrap"
            )}
          >
            {controls.map((control) => {
              return (
                <ControlCard control={control} key={control.id} uid={uid} />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex gap-10">Nenhum controle cadastrada</div>
      )}
    </div>
  );
};

export const ControlCard = ({
  control,
  uid,
}: {
  control: controlType;
  uid: string | undefined;
}) => {
  const balance = Number(control.controlValue) - Number(control.spentValue);

  return (
    <div>
      <div className=" h-40 w-[320px]  bg-primary grid  px-5 py-2 rounded-xl text-light-text">
        <div className="flex justify-between">
          <p className="text-xl"> {control.name} </p>
          <ControlDetails control={control} uid={uid} />
        </div>
        <p className="text-3xl font-bold">
          {" "}
          R$ {String(
            Number(control.spentValue).toFixed(2).replace(".", ",")
          )}{" "}
        </p>
        <p>
          Seu objetivo é: R${" "}
          {String(Number(control.controlValue).toFixed(2).replace(".", ","))}
        </p>
        <p
          className={cn(
            "text-xs",
            balance >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {balance >= 0
            ? "Você ainda pode gastar "
            : "Você já ultrapassou seu limite em "}
          R${" "}
          {String(
            Number(balance).toFixed(2).replace(".", ",").replace("-", "")
          )}
        </p>
      </div>
    </div>
  );
};
