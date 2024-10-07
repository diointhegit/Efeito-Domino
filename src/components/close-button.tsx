"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

export const CloseButton = ({
  close,
  size,
  className,
  containerId,
}: {
  close: () => void;
  size: number;
  className?: string;
  containerId?: string;
}) => {
  const [areYouSure, setAreYouSure] = useState(false);

  const openAreYouSure = () => {
    setAreYouSure(true);
  };

  const closeAreYouSure = () => {
    setAreYouSure(false);
  };
  if (containerId) {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") openAreYouSure();
    });
  }

  return (
    <div>
      <div
        onClick={() => setAreYouSure(true)}
        className={cn("cursor-pointer", className)}
      >
        <CgClose size={size} />
      </div>
      {areYouSure && (
        <div className="inset-0 z-20 bg-black/50 flex absolute items-center justify-center cursor-default">
          <div className="border-secondary  bg-light-bg border-2 w-[20rem] h-[6rem] p-5">
            Deseja realmente fechar?
            <div className="flex gap-5">
              <button
                onClick={close}
                id="closeButton"
                className="bg-primary px-5 border hover:border-primary hover:bg-light-bg hover:border"
              >
                {" "}
                Fechar{" "}
              </button>
              <button
                onClick={closeAreYouSure}
                id="cancelButton"
                className="border-primary border-2 px-5  "
              >
                {" "}
                Cancelar{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
