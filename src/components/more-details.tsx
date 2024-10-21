"use client";
import { useState } from "react";
import { DiVim } from "react-icons/di";
import { CloseButton } from "./close-button";
import { deleteProgrammed, programmedToStatement } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
export const MoreDetails = ({
  transaction,
  date,
}: {
  transaction: any;
  date: string;
}) => {
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    programmedToStatement(supabase, transaction);
  };
  return (
    <div>
      <OpenButton open={handleOpen} />

      {open && (
        <div className="absolute flex inset-0 justify-center items-center bg-black/50">
          <div className="bg-light-bg h-[16rem] w-[30rem] py-6 rounded-md flex  flex-col justify-between">
            <div>
              <CloseButton close={handleClose} className="float-right px-10" />

              <div className="grid gap-2 px-6 text-left">
                <p>{transaction.name}</p>
                <p> Programado para: {date}</p>
                <p>Valor: R$ {Number(transaction.value).toFixed(2)}</p>
                <p>
                  Tipo: {transaction.type == "income" ? "Entrada" : "Saída"}
                </p>
              </div>
            </div>

            <div className="flex gap-5 px-1 justify-center">
              <button className="border border-1 border-black px-5 py-2">
                Cancelar transação
              </button>
              <button
                onClick={handleAccept}
                className="border border-1 bg-primary text-light-text rounded-md hover:bg-light-bg hover:text-dark-text duration-110 ease-in-out transition-all border-black px-5 py-2"
              >
                Aceitar transação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const OpenButton = ({ open }: { open: () => void }) => {
  return (
    <button
      className="rounded-lg border-2 border-secondary w-full col-span-2 md:col-auto my-2 md:my-0 hover:bg-secondary hover:text-light-text transition-all duration-150"
      onClick={open}
    >
      {" "}
      Mais detalhes{" "}
    </button>
  );
};
