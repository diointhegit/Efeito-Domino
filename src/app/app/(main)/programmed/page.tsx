import { MoreDetails } from "@/components/more-details";
import { getProgrammed, getUid } from "@/lib/supabase-utils";
import { dateToBRStringDate, ISOToBRStringDate } from "@/lib/timefns";
import { createClient } from "@/utils/supabase/server";
import { ProgrammedStatement } from "./programmed";

export default async function Page() {
  const supabase = createClient();
  const uid = await getUid(supabase);

  const programmed = await getProgrammed(supabase, uid);

  return (
    <div className="px-5 ">
      <div className="w-4/5">
        <h2 className="text-2xl">Programações</h2>
        <p>
          Aqui você consegue colocar uma data pra uma transação que você{" "}
          <b>sabe</b> que vai acontecer, ou que planeja que ocorra{" "}
        </p>
      </div>
      <ProgrammedStatement programmed={programmed} uid={uid} />
    </div>
  );
}
