import { createClient } from "@/utils/supabase/server";
import { MainHeader, SecondHeader } from "./saldo";
import { FaAngleRight, FaInfoCircle } from "react-icons/fa";
import { Controls } from "@/components/controls";
import { AddProgrammedTransaction } from "../programmed/add-programmed";
import { AddTransaction } from "@/components/add-transaction";
import {
  ShortcutAddProgrammedTransaction,
  ShortcutAddTransaction,
} from "@/components/shortcuts-home";
import { ProgrammedShortcut } from "@/components/programmed-shortcut";
import { getCategories, getProgrammed } from "@/lib/supabase-utils";
import { supabaseReturnType, transactionType } from "@/lib/types";
import {
  addDays,
  isPast,
  isSameWeek,
  isThisWeek,
  isWithinInterval,
} from "date-fns";
import { programmedTransactionType } from "@/lib/schemas";
import { HomeHeader } from "@/components/home-header";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;

  const getUser = async (id: string | undefined) => {
    const { data, error } = await supabase
      .from("user")
      .select()
      .eq("user_id", id);
    if (error) {
      return error;
    }
    return data[0];
  };

  const user = await getUser(uid);

  const getProgrammedValues = async (programmed: any[]) => {
    if (Array.isArray(programmed)) {
      let value = 0;
      programmed.forEach((statement) => {
        if (statement.type == "income") {
          value += statement.value;
        } else {
          value -= statement.value;
        }
      });
      return value;
    }
  };

  const getProgrammedInThisWeek = (programmed: supabaseReturnType) => {
    let thisWeek: programmedTransactionType[] = [];
    const isThisWeekOrPast = (date: Date) => {};

    if (programmed instanceof Array) {
      programmed.forEach((transaction: programmedTransactionType) => {
        // checks if its past or in 7 days
        if (
          isWithinInterval(transaction.date, {
            start: new Date(),
            end: addDays(Date.now(), 7),
          }) ||
          isPast(transaction.date)
        ) {
          thisWeek.push(transaction);
        }
      });
      thisWeek.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
      );
      return thisWeek;
    }
    return [];
  };
  const categories = await getCategories(supabase, uid);
  const programmed = (await getProgrammed(supabase, uid)) as any[];
  const programmedValues = await getProgrammedValues(programmed);
  const programmedThisWeek = getProgrammedInThisWeek(programmed);
  const monthBalance = user?.balance + programmedValues;

  return (
    <div className="">
      <HomeHeader monthBalance={monthBalance} user={user} />

      <div className="p-5 ">
        <p className="text-2xl">Atalhos:</p>
        <div className="flex gap-5">
          <ShortcutAddTransaction categories={categories} uid={uid} />
          <ShortcutAddProgrammedTransaction uid={uid} categories={categories} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-3xl pb-5">Seus controles esse mês:</h3>
        <div className="">
          <Controls displayType="scroll" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-3xl mb-2">Programações recentes</h3>
        <div
          className="space-y-3 bg-primary rounded-md px-5 py-8 overflow-y-scroll"
          id="hide_scrollbar"
        >
          {programmedThisWeek.map((transaction: any) => {
            return <ProgrammedShortcut transaction={transaction} uid={uid} />;
          })}

          {programmedThisWeek.length == 0 ? (
            <p className="text-light-text">
              Não há nenhuma transação programada para essa semana
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
