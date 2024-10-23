"use client";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { DiVim } from "react-icons/di";
import { CloseButton } from "./close-button";

export const AddControl = () => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const todayDate = new Date().toISOString().slice(0, 10);
  console.log(todayDate);
  return (
    <div id="controlId">
      <p
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={handleOpen}
      >
        Criar controle <BiPlus />{" "}
      </p>
      {isOpen && (
        <div className="inset-0 flex items-center justify-center absolute bg-black/75 transition-all duration-100 ">
          <div className="w-[20rem] bg-light-bg h-[20rem]">
            <CloseButton close={handleClose} containerId="controlId" />
            <form action="" className="grid">
              <label htmlFor="name">Nome</label>
              <input type="text" />
              <label htmlFor="value">Valor</label>
              <input type="date" min={todayDate.slice(0, 10)} />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
