"use client";

import { controlType } from "@/lib/types";
import { useState } from "react";
import { CloseButton } from "./close-button";
import { cn } from "@/lib/utils";

export const ControlDetails = ({ control }: { control: controlType }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(control.spentValue > control.controlValue);
  return (
    <div>
      <p className="text-sm hover:cursor" onClick={handleOpen}>
        Editar
      </p>

      {isOpen && (
        <div
          id="controlDetails"
          className="inset-0 absolute flex items-center justify-center bg-black/50"
        >
          <CloseButton close={handleClose} containerId="controlDetails" />
          <p>{control.name}</p>
          <div className="flex gap-2">
            <div className="w-[20rem] h-5 bg-light-bg rounded-lg">
              <div
                style={{
                  width: `${(control.spentValue / control.controlValue) * 100}%`,
                }}
                className={cn(
                  "rounded-lg h-5",
                  control.spentValue > control.controlValue
                    ? "bg-red-500"
                    : "bg-green-500"
                )}
              ></div>
            </div>
            <p>R$ {control.controlValue}</p>
          </div>
        </div>
      )}
    </div>
  );
};
