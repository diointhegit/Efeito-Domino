"use client";

import { controlType } from "@/lib/types";
import { useState } from "react";
import { CloseButton } from "./close-button";
import { cn } from "@/lib/utils";
import { dateToBRStringDate } from "@/lib/timefns";
import { EditControlForm } from "./control-form";
import { getUid, resetControl } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const ControlDetails = ({
  control,
  uid,
}: {
  control: controlType;
  uid: string | undefined;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isResetOpen, setOpenReset] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenReset = () => {
    setOpenReset(true);
  };
  const handleCloseReset = () => {
    setOpenReset(false);
  };

  const handleOpenEdit = () => {
    setOpen(false);
    setEditOpen(true);
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
    setOpen(true);
  };

  async function handleResetControl() {
    await resetControl(supabase, uid, control);
    handleCloseReset();
    handleClose();
    router.refresh();
  }

  const getBarWidth = (spentValue: number, controlValue: number) => {
    return (spentValue / controlValue) * 100 > 100
      ? 100
      : (spentValue / controlValue) * 100;
  };

  const barWidth = getBarWidth(control.spentValue, control.controlValue);
  const isOver = control.spentValue > control.controlValue;
  return (
    <div>
      <p className="text-sm hover:cursor-pointer" onClick={handleOpen}>
        Ver sobre
      </p>

      {isOpen && (
        <div
          id="controlDetails"
          className="inset-0 absolute flex items-center justify-center bg-black/50"
        >
          <div className="bg-light-bg text-dark-text rounded-lg px-5 py-2 md:w-[32rem] w-[22rem]">
            <div className="flex justify-end h-6">
              <CloseButton
                close={handleClose}
                containerId="controlDetails"
                className="justify-end"
              />
            </div>
            <div className="flex items-center justify-center ">
              <div className="w-full md:w-auto">
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-lg ">{control.name}</p>
                  <p className="col-span-2 font-bold text-md sm:text-lg ">
                    R$ {String(control.spentValue.toFixed(2).replace(".", ","))}
                  </p>
                </div>
                <div className="flex gap-2 items-center ">
                  <div className="h-5 md:w-[20rem] w-full  rounded-lg outline-1 outline">
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
                  <p className="sm:text-xl text-xs ">
                    {String(control.controlValue.toFixed(2).replace(".", ","))}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-2">
              <p>
                {isOver
                  ? "Você ultrapassou seu controle :( "
                  : " Você está dentro do seu controle, parabéns!"}
              </p>
              <p>
                Ele irá manter contagem até dia{" "}
                <b>{dateToBRStringDate(control.until)}</b>
              </p>
            </div>
            <div className="flex">
              <button
                onClick={handleOpenEdit}
                className="px-2 outline outline-1 outline-black rounded-md my-3 mx-2"
              >
                Editar controle
              </button>
              <button
                onClick={handleOpenReset}
                className="px-2 outline outline-1 outline-black rounded-md my-3 mx-2"
              >
                Resetar contagem
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div className="z-20 bg-black/60 inset-0 flex absolute justify-center items-center">
          <div className="w-[320px] bg-light-bg  rounded-lg text-dark-text space-y-6">
            <EditControlForm
              control={control}
              handleCloseEdit={handleCloseEdit}
            />
          </div>
        </div>
      )}

      {isResetOpen && (
        <div className="z-20 bg-black/60 inset-0 flex absolute justify-center items-center text-dark-text">
          <div className="w-[320px] bg-light-bg px-5">
            <p>Você deseja resetar a contagem do seu Controle?</p>
            <div className="flex gap-5">
              <button
                className="px-2 outline outline-1 outline-black rounded-md my-3 mx-2"
                onClick={handleResetControl}
              >
                Sim
              </button>
              <button
                className="px-2 outline outline-1 outline-black rounded-md my-3 mx-2"
                onClick={handleCloseReset}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
