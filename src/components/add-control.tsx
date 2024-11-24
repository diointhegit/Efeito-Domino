"use client";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { DiVim } from "react-icons/di";
import { CloseButton } from "./close-button";
import { useForm } from "react-hook-form";
import { ControlSchema, controlType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BR$Input } from "./currency-input";
import { periodicities } from "@/lib/utils";
import { createControl, getUid } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const AddControl = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<controlType>({
    resolver: zodResolver(ControlSchema),
  });

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const supabase = createClient();
  const router = useRouter();
  const onSubmit = async (data: controlType) => {
    console.log(data);
    data.spentValue = 0;
    data.user_id = await getUid(supabase);
    await createControl(supabase, data);
    handleClose();
    router.refresh();
  };

  const todayDate = new Date().toISOString().slice(0, 10);
  return (
    <div id="controlId" className="">
      <div className="bg-primary px-5 text-light-text rounded-md py-2 hover:bg-light-bg hover:outline-1 hover:outline-primary hover:text-primary hover:outline transition-all w-fit my-5">
        <p
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={handleOpen}
        >
          Criar controle <BiPlus />{" "}
        </p>
      </div>
      {isOpen && (
        <div className="inset-0 flex items-center justify-center absolute bg-black/75 transition-all duration-100 ">
          <div className="w-[22rem] bg-light-bg  rounded-md">
            <div className="p-5">
              <div className="px-2 flex justify-end">
                <CloseButton close={handleClose} containerId="controlId" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="grid px-2">
                <label htmlFor="name">Nome</label>
                <input
                  {...register("name")}
                  type="text"
                  className="border-2  p-1.5 border-black rounded-md"
                />
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="value">Valor limite para seu controle</label>
                <BR$Input
                  name="controlValue"
                  className="border-2   p-1.5 border-black rounded-md"
                  register={register}
                  registerName={"controlValue"}
                />
                {errors.controlValue && <p>{errors.controlValue.message}</p>}
                <label htmlFor="until">Data até resetar</label>
                <input
                  type="date"
                  min={todayDate.slice(0, 10)}
                  {...register("until")}
                  className="border-2   p-1.5 border-black rounded-md"
                />
                {errors.until && <p>{errors.until.message}</p>}

                <label htmlFor="periodicity">Período para resetar</label>
                <select
                  id=""
                  {...register("periodicity")}
                  className="border-2   p-1.5 border-black rounded-md"
                >
                  {periodicities.map((period) => {
                    return <option>{period}</option>;
                  })}
                </select>

                <button
                  type="submit"
                  className="px-5 py-2 border-2 border-black rounded-md my-3 bg-white"
                >
                  Confirmar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
