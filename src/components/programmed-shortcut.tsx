"use client";
import { toBRCurrency } from "@/lib/currency";
import { dateToBRStringDate } from "@/lib/timefns";
import { MoreDetails } from "./more-details";

export const ProgrammedShortcut = ({ transaction }: { transaction: any }) => {
  return (
    <div className="px-5 bg-light-bg rounded-md  py-5 grid grid-cols-4 ">
      <p>{transaction.name}</p>
      <p>
        {transaction.type == "income" ? "+ " : "- "}
        {toBRCurrency(transaction.value)}
      </p>
      <p>{dateToBRStringDate(transaction.date)}</p>
      <MoreDetails
        className="text-dark-text"
        transaction={transaction}
        date={transaction.date}
      />
    </div>
  );
};
