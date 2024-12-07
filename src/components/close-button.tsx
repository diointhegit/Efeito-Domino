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
  size?: number;
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
        <div className="inset-0 z-20 bg-black/50 flex absolute items-center justify-center cursor-default ">
          <div className="rounded-md bg-light-bg border-2 shadow-lg border-black w-[20rem] h-[6rem] p-5">
            Deseja realmente fechar?
            <div className="flex gap-5 my-2">
              <button
                onClick={closeAreYouSure}
                id="cancelButton"
                className="border-black hover:bg-black/10 rounded border-2 px-5 transition-all ease-in-out duration-150  "
              >
                {" "}
                Não{" "}
              </button>
              <button
                onClick={close}
                id="closeButton"
                className="bg-secondary rounded-md text-light-text px-5  hover:border-secondary hover:bg-white  hover:border-2 hover:text-secondary  border-black border-2 ease-in-out duration-150"
              >
                {" "}
                Fechar{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CancelButton = () => {};
