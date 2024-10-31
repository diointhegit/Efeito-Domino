"use client";
import { useState } from "react";
import { DiVim } from "react-icons/di";
import { CloseButton } from "./close-button";
import { deleteProgrammed, programmedToStatement } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
export const MoreDetails = ({
  transaction,
  date,
  className,
}: {
  className?: string;
  transaction: any;
  date: string;
}) => {
  const [open, setOpen] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenReschedule = () => {
    setOpenReschedule(true);
  };
  const handleCloseSchedule = () => {
    setOpenReschedule(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async () => {
    // await programmedToStatement(supabase, transaction);
    handleClose();
    handleOpenReschedule();
    // router.refresh();
  };
  return (
    <div className={cn(className)}>
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
      {openReschedule && <RescheduleTransaction close={handleCloseSchedule} />}
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

export const RescheduleTransaction = ({ close }: { close: () => void }) => {
  return (
    <div className="flex inset-0 h-screen w-screen absolute bg-black/40 justify-center items-center">
      <div className="bg-light-bg w-[30rem] h-[20rem] px-5 rounded-md flex flex-col justify-around">
        <div className="grid">
          Você deseja programar essa mesma transação para outro momento?
          <select name="time" id="" className="outline-1 outline outline-black">
            <option value="1">Amanhã</option>
            <option value="7">Semana que vem</option>
            <option value="14">Duas semanas</option>
            <option value="15">Daqui 15 dias</option>
            <option value="30">Daqui 30 dias</option>
            <option value="month">Mês que vem</option>
          </select>
        </div>
        <div className="flex justify-around">
          <button>Não</button>
          <button>Vamos reprogramar!</button>
        </div>
      </div>
    </div>
  );
};
