import { createClient } from "@/utils/supabase/server";
import { MainHeader } from "./saldo";
import { FaInfoCircle } from "react-icons/fa";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;

  const getUser = async (id: string | undefined) => {
    const { data, error } = await supabase.from("user").select().eq("id", id);
    if (error) {
      return error;
    }
    return data[0];
  };

  const user = await getUser(uid);
  return (
    <div className="">
      <div className="px-12 py-5 bg-primary">
        <MainHeader name={user.name} balance={user.balance} />
      </div>

      <div className="flex my-6 ml-5">
        <div className="w-[300px] hidden sm:block"> . </div>
        <div className="space-y-5">
          <h3 className="text-3xl pb-5">Suas metas esse mês:</h3>
          <div className="  ">
            <div className="h-32  bg-primary grid  px-5 py-2 rounded-xl">
              <p className="text-xl"> Assinaturas </p>
              <p className="text-3xl font-bold"> R$ 25,00 </p>
            </div>
            <div className="h-32 bg-primary grid  px-5 py-2 rounded-xl">
              <div className=" gap-5 flex ">
                <p className="text-lg">Saldo Previsto Para Mês</p>
                <FaInfoCircle className="mt-1.5" />
              </div>
              <p className="text-3xl font-bold"> R$ 25,00 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
