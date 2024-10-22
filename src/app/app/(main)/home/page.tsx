import { createClient } from "@/utils/supabase/server";
import { MainHeader, SecondHeader } from "./saldo";
import { FaInfoCircle } from "react-icons/fa";
import { Controls } from "./metas";

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

  const getProgrammedValues = async (id: string | undefined) => {
    const { data, error } = await supabase
      .from("programmed")
      .select()
      .eq("user_id", id);
    if (error) {
      return error;
    }
    if (data) {
      let value = 0;
      data.forEach((statement) => {
        if (statement.type == "positive") {
          value += statement.value;
        } else {
          value -= statement.value;
        }
      });
      return value;
    }
  };

  const programmedValues = await getProgrammedValues(uid);

  const monthBalance = user.balance + programmedValues;

  return (
    <div className="">
      <div className="px-12 py-5 bg-primary text-light-text flex gap-10">
        <MainHeader name={user.name} balance={user.balance} />
        <div className="min-h-[100px] w-0.5 bg-white"></div>
        <SecondHeader monthBalance={monthBalance} />
      </div>

      <div className="p-5">
        <h3 className="text-3xl pb-5">Suas metas esse mês:</h3>
        <Controls />
      </div>

      <div className="p-5">
        <h3 className="text-3xl">Programados para essa semana</h3>
      </div>
    </div>
  );
}
