"use client";
import { MoreDetails } from "@/components/more-details";
import { dateToBRStringDate } from "@/lib/timefns";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { AddProgrammedTransaction } from "./add-programmed";
import { motion } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="md:w-[50rem]   my-4 h-[40rem] border border-primary bg-primary px-5 py-5 rounded-lg "
    >
      <div className="flex justify-end my-6">
        <div
          className="text-2xl text-light-text hover:cursor-pointer hover:text-neutral-400"
          onClick={handleOpen}
        >
          Adicionar
        </div>
      </div>
      <div className="space-y-2">
        {programmed.map((transaction: any) => {
          let date = dateToBRStringDate(transaction.date);
          return (
            <div className="bg-light-bg  md:text-lg px-4 py-4 grid md:grid-cols-4 grid-cols-2 rounded-xl gap-2 items-center ">
              <p>{transaction.name}</p>
              <p>
                {transaction.type == "debt" ? "- " : "+ "}R$
                {Number(transaction.value).toFixed(2)}
              </p>
              <p>{date}</p>
              <MoreDetails transaction={transaction} date={date} uid={uid} />
            </div>
          );
        })}
      </div>
      {isOpen && <AddProgrammedTransaction close={handleClose} uid={uid} />}
    </motion.div>
  );
};
