"use client";
import { MoreDetails } from "@/components/more-details";
import { dateToBRStringDate } from "@/lib/timefns";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { AddProgrammedTransaction } from "./add-programmed";

export const ProgrammedStatement = ({
  programmed,
  uid,
}: {
  programmed: any;
  uid: string | undefined;
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="bg-primary w-[40rem] h-[40rem] px-5 py-2 rounded-md">
      <div className="flex justify-end my-6">
        <div className="relative w-fit  after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition   after:duration-300 after:origin-left text-light-text items-center text-xl ">
          <div
            className="flex gap-2 items-center cursor-pointer w-full justify-end"
            onClick={handleOpen}
          >
            Adicionar programação
            <BiPlus aria-label="ícone de Mais" size={30} />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {programmed.map((transaction: any) => {
          let date = dateToBRStringDate(transaction.date);
          return (
            <div className="bg-light-bg  md:text-lg px-4 py-4 grid md:grid-cols-4 grid-cols-2 rounded-xl ">
              <div className="flex gap-5">
                <p>{transaction.name}</p>
              </div>
              <p>
                {transaction.type == "debt" ? "- " : "+ "}R$
                {Number(transaction.value).toFixed(2)}
              </p>
              <p>{date}</p>
              <MoreDetails transaction={transaction} date={date} />
            </div>
          );
        })}
      </div>
      {isOpen && <AddProgrammedTransaction close={handleClose} uid={uid} />}
    </div>
  );
};
