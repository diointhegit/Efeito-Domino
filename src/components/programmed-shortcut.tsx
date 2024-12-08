"use client";
import { toBRCurrency } from "@/lib/currency";
import { dateToBRStringDate } from "@/lib/timefns";
import { MoreDetails } from "./more-details";

export const ProgrammedShortcut = ({
  transaction,
  uid,
}: {
  transaction: any;
  uid: string | undefined;
}) => {
  return (
    <div className="px-5 bg-light-bg rounded-md  py-5 grid md:grid-cols-4 grid-cols-2">
      <p>{transaction.name}</p>
      <p>
        {transaction.type == "income" ? "+ " : "- "}
        {toBRCurrency(transaction.value)}
      </p>
      <p>{dateToBRStringDate(transaction.date)}</p>
      <MoreDetails
        uid={uid}
        className="text-dark-text"
        transaction={transaction}
        date={transaction.date}
      />
    </div>
  );
};
