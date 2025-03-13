import { MoreDetails } from "@/components/more-details";
import { getCategories, getProgrammed, getUid } from "@/lib/supabase-utils";
import { dateToBRStringDate, ISOToBRStringDate } from "@/lib/timefns";
import { createClient } from "@/utils/supabase/server";
import { ProgrammedStatement } from "./programmed";

export default async function Page() {
  const supabase = createClient();
  const uid = await getUid(supabase);
  const categories = await getCategories(supabase, uid);

  const programmed = await getProgrammed(supabase, uid);

  return (
    <div className="px-5 flex flex-col items-center text-left md:block md:px-20">
      <div className="w-4/5">
        <h2 className="text-2xl">Programações</h2>
        <p>
          Aqui você consegue colocar uma data pra uma transação que você{" "}
          <b>sabe</b> que vai acontecer, ou que planeja que ocorra{" "}
        </p>
      </div>
      <ProgrammedStatement
        programmed={programmed}
        uid={uid}
        categories={categories}
      />
    </div>
  );
}
