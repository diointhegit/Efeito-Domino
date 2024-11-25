"use client";
import { AddTransaction } from "@/components/add-transaction";
import { dateToBRStringDate } from "@/lib/timefns";
import { transactionType } from "@/lib/types";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

export const Extrato = ({
  statement,
  uid,
}: {
  statement: transactionType[];
  uid: string | undefined;
}) => {
  const [addTransaction, setAddTransaction] = useState(false);

  const openAddTransaction = () => {
    setAddTransaction(true);
  };
  const closeAddTransaction = () => {
    setAddTransaction(false);
  };
  return (
    <div>
      <ExtratoCard
        statement={statement}
        openAddTransaction={openAddTransaction}
      />
      {/* {addTransaction && (
        <AddTransaction uid={uid} close={closeAddTransaction} />
      )} */}
    </div>
  );
};

export const ExtratoCard = ({
  statement,
  openAddTransaction,
}: {
  statement: transactionType[];
  openAddTransaction: () => void;
}) => {
  return (
    <div
      id="hide_scrollbar"
      className="md:w-[50rem] w-full my-4 h-[40rem] border border-primary bg-primary space-y-5 px-5 py-5 rounded-lg overflow-y-scroll"
    >
      <div className="flex justify-end">
        <div className="relative w-fit  after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition   after:duration-300 after:origin-left text-light-text items-center text-xl "></div>
      </div>

      {statement &&
        statement.map((transaction: transactionType) => {
          return (
            <div
              key={transaction.id}
              className="bg-light-bg  md:text-lg px-4 py-4 grid md:grid-cols-4 grid-cols-2 rounded-xl "
            >
              <p>{transaction.name}</p>
              <p>
                {transaction.type == "income" ? "+ " : "- "}
                R${" "}
                {String(Number(transaction.value).toFixed(2)).replace(".", ",")}
              </p>
              <p className="">{dateToBRStringDate(transaction.created_at)}</p>
              <button className="rounded-lg border-2 border-secondary w-full col-span-2 md:col-auto my-2 md:my-0 hover:bg-secondary hover:text-light-text transition-all duration-150">
                Ver detalhes
              </button>
            </div>
          );
        })}
    </div>
  );
};
