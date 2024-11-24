"use client";

import { useState } from "react";
import { CloseButton } from "./close-button";
import { BR$Input } from "./currency-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveToGoalSchema, saveToGoalType } from "@/lib/schemas";
import {
  getBalance,
  getUid,
  saveToGoal,
  updateBalance,
} from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import { toBRCurrency } from "@/lib/currency";
import { useRouter } from "next/navigation";

export const SaveToGoals = ({
  goal,
  balance,
}: {
  goal: any;
  balance: number;
}) => {
  const [isOpenSave, setOpenSave] = useState(false);
  const [isOpenConfirmSave, setConfirmOpenSave] = useState(false);
  const [futureBalance, setFutureBalance] = useState(0);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const supabase = createClient();
  const handleOpenSave = () => {
    setOpenSave(true);
  };
  const handleCloseSave = () => {
    setOpenSave(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<saveToGoalType>({
    resolver: zodResolver(saveToGoalSchema),
  });

  const onSubmit = (data: any) => {
    setFutureBalance(balance - data.value);
    setValue(data.value);
    handleCloseSave();
    handleOpenConfirmSave();
  };
  const handleOpenConfirmSave = () => {
    setConfirmOpenSave(true);
  };
  const handleCloseConfirmSave = () => {
    setConfirmOpenSave(false);
  };

  const addToGoal = async () => {
    await saveToGoal(supabase, balance, value, goal);
    router.refresh();
    handleCloseConfirmSave();
  };

  console.log(errors);
  return (
    <div>
      <p className="float-right hover:cursor-pointer" onClick={handleOpenSave}>
        Guardar mais +{" "}
      </p>
      {isOpenSave && (
        <div className="inset-0 absolute flex items-center justify-center bg-black/50">
          <div className="bg-light-bg px-10 w-[320px] md:w-[27rem] py-5 rounded-md text-dark-text">
            <div className="float-right">
              <CloseButton close={handleCloseSave} />
            </div>
            <p className="text-xl font-bold">{goal.name}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="grid">
              <label htmlFor="value">Adicionar</label>
              <BR$Input
                name="value"
                className={cn(
                  "border-2   p-1.5 border-black rounded-md",
                  errors.value ? "border-red-500" : ""
                )}
                register={register}
                registerName={"value"}
              />
              {errors.value && (
                <p className="text-red-500">{errors.value.message}</p>
              )}
              <p>Seu saldo atual: {toBRCurrency(balance)}</p>
              <button>Guardar</button>

              <input
                type="number"
                className="hidden"
                value={Number(balance)}
                {...register("balance")}
              />
              <input
                type="number"
                className="hidden"
                value={Number(goal.achieved_value)}
                {...register("achieved_value")}
              />
              <input
                type="number"
                className="hidden"
                value={Number(goal.goal_value)}
                {...register("goal_value")}
              />
            </form>
          </div>
        </div>
      )}
      {isOpenConfirmSave && (
        <div className="inset-0 absolute flex items-center justify-center bg-black/50">
          <div className="bg-light-bg px-10 w-[320px] md:w-[27rem] py-5 rounded-md text-dark-text">
            <p>Seu saldo será de: {toBRCurrency(futureBalance)}</p>
            <button onClick={addToGoal}> Guardar </button>
          </div>
        </div>
      )}
    </div>
  );
};
