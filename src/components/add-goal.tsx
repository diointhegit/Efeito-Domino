"use client";
import { goalSchema, goalType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { BR$Input } from "./currency-input";
import { addHours } from "date-fns";
import { createGoal, getUid } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { CloseButton } from "./close-button";

export const AddGoal = () => {
  const [isOpenCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<goalType>({
    resolver: zodResolver(goalSchema),
  });
  const supabase = createClient();

  const today = new Date().toISOString().slice(0, 10);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const uid = await getUid(supabase);
    data.user_id = uid;
    await createGoal(supabase, data);
    handleCloseCreate();
    router.refresh();
  };

  return (
    <div>
      <div
        className="bg-primary px-5 text-light-text rounded-md py-2 hover:bg-light-bg hover:outline-1 hover:outline-primary hover:text-primary hover:outline transition-all w-fit my-5"
        onClick={handleOpenCreate}
      >
        <p className="flex items-center gap-2 hover:cursor-pointer">
          Criar meta <BiPlus />{" "}
        </p>
      </div>
      {isOpenCreate && (
        <div className="inset-0 flex items-center justify-center absolute bg-black/75 transition-all duration-100 ">
          <div className="w-[320px] md:w-[25rem] px-10 bg-light-bg  rounded-md  py-5">
            <CloseButton close={handleCloseCreate} className="float-right" />
            <form className="grid" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Qual a sua meta?</label>
              <input
                type="text"
                {...register("name")}
                className="border-2  p-1.5 border-black rounded-md"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <label htmlFor="GoalValue">Qual o valor pra se alcançar?</label>
              <BR$Input
                name="goal_value"
                register={register}
                registerName={"goal_value"}
                className="border-2  p-1.5 border-black rounded-md"
              />
              {errors.goal_value && (
                <p className="text-red-500">{errors.goal_value.message}</p>
              )}

              <label htmlFor="Unilt">
                Até quando você pretende conseguir essa meta?
              </label>

              <input
                type="date"
                min={today}
                {...register("until")}
                className="border-2  p-1.5 border-black rounded-md"
              />

              <input
                type="number"
                {...register("achieved_value")}
                className="hidden"
                value={0}
              />
              <input
                type="date"
                {...register("created_at")}
                className="hidden"
                value={today}
              />
              {errors.until && (
                <p className="text-red-500">{errors.until.message}</p>
              )}

              <button
                type="submit"
                className="px-2 outline outline-1 outline-black rounded-md my-3 bg-primary text-white py-2"
              >
                Criar meta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
