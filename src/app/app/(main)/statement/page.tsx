import { transactionType } from "@/lib/types";
import { Extrato } from "./extrato";
import { BiChevronRight, BiPlus } from "react-icons/bi";
import { AddTransaction } from "@/components/add-transaction";
import { getSupabase } from "@/server-actions/transaction-actions";

export default async function Page() {
  const supabase = await getSupabase();

  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  const getStatement = async (id: string | undefined) => {
    const { data, error } = await supabase
      .from("statement")
      .select()
      .eq("user_id", id);
    if (error) {
      return error;
    }
    return data;
  };

  const statement = (await getStatement(uid)) as transactionType[];
  return (
    <div className="px-5 flex flex-col items-center text-left md:block md:px-20 bg-light-bg">
      <div className="text-start md:w-[50rem]">
        <h1 className="text-4xl ">Extrato</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Aqui você vê quais transações você teve</h2>
        </div>
      </div>

      <Extrato statement={statement} uid={uid} />
    </div>
  );
}
