"use client";
import { useState } from "react";
import { AddTransaction } from "./add-transaction";
import { AddProgrammedTransaction } from "@/app/app/(main)/programmed/add-programmed";
import { quickControlType } from "@/lib/supabase-utils";
export const ShortcutAddTransaction = ({
  uid,
  categories,
}: {
  categories: quickControlType[];
  uid: string | undefined;
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-primary px-5 text-light-text rounded-md py-2 hover:bg-light-bg hover:outline-1 hover:outline-primary hover:text-primary hover:outline transition-all"
        onClick={handleOpen}
      >
        Adicionar transação
      </button>
      {isOpen && (
        <AddTransaction close={handleClose} uid={uid} categories={categories} />
      )}
    </div>
  );
};

export const ShortcutAddProgrammedTransaction = ({
  uid,
}: {
  uid: string | undefined;
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-primary px-5 text-light-text rounded-md py-2 hover:bg-light-bg hover:outline-1 hover:outline-primary hover:text-primary hover:outline transition-all"
        onClick={handleOpen}
      >
        Programar transação
      </button>
      {isOpen && <AddProgrammedTransaction close={handleClose} uid={uid} />}
    </div>
  );
};
