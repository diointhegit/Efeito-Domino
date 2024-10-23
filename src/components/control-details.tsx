"use client";

import { controlType } from "@/lib/types";
import { useState } from "react";
import { CloseButton } from "./close-button";
import { cn } from "@/lib/utils";
import { dateToBRStringDate } from "@/lib/timefns";

export const ControlDetails = ({ control }: { control: controlType }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(control.spentValue > control.controlValue);
  const getBarWidth = (spentValue: number, controlValue: number) => {
    return (spentValue / controlValue) * 100 > 100
      ? 100
      : (spentValue / controlValue) * 100;
  };

  const barWidth = getBarWidth(control.spentValue, control.controlValue);

  return (
    <div>
      <p className="text-sm hover:cursor-pointer" onClick={handleOpen}>
        Editar
      </p>

      {isOpen && (
        <div
          id="controlDetails"
          className="inset-0 absolute flex items-center justify-center bg-black/50"
        >
          <div className="bg-light-bg text-dark-text rounded-lg px-5 py-2 w-[32rem]">
            <div className="flex justify-end h-6">
              <CloseButton
                close={handleClose}
                containerId="controlDetails"
                className="justify-end"
              />
            </div>
            <div className="flex items-center justify-center ">
              <div className="">
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-lg ">{control.name}</p>
                  <p className="col-span-2 font-bold text-lg">
                    R$ {String(control.spentValue.toFixed(2).replace(".", ","))}
                  </p>
                </div>
                <div className="flex gap-2 items-center ">
                  <div className="h-5 w-[20rem] rounded-lg outline-1 outline">
                    <div
                      style={{
                        width: `${barWidth}%`,
                      }}
                      className={cn(
                        "rounded-lg h-5",
                        control.spentValue > control.controlValue
                          ? "bg-red-500"
                          : "bg-green-500"
                      )}
                    ></div>
                  </div>
                  <p className="text-xl ">
                    R${" "}
                    {String(control.controlValue.toFixed(2).replace(".", ","))}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-2">
              <p>Você está dentro do seu controle, parabéns!</p>
              <p>
                Ele irá manter contagem até dia{" "}
                <b>{dateToBRStringDate(control.until)}</b>
              </p>
            </div>
            <div className="flex gap-5">
              <button>Adicionar um gasto a esse controle </button>
              <button>Editar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
