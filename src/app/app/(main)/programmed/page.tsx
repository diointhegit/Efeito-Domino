import { getProgrammed } from "@/lib/supabase-utils";

export default async function Page() {
  // const programmed = getProgrammed();
  return (
    <div className="px-5 ">
      <div className="w-4/5">
        <h2 className="text-2xl">Programações</h2>
        <p>
          Aqui você consegue colocar uma data pra uma transação que você{" "}
          <b>sabe</b> que vai acontecer, ou que planeja que ocorra{" "}
        </p>
      </div>
      <div className="bg-primary w-[40rem] h-[40rem] px-5 py-2 rounded-md">
        <div className="bg-light-bg rounded-md">
          <p className="p-2">oi </p>
        </div>
      </div>
    </div>
  );
}
