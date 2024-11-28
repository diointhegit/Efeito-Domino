import {
  programmedTransactionSchema,
  programmedTransactionType,
  reprogramSchema,
  reprogramType,
  transactionSchema,
  TransactionSchema,
} from "@/lib/schemas";
import {
  addTransaction,
  deleteProgrammed,
  reprogramProgrammed,
} from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const ReprogramTransaction = ({
  transaction,
  uid,
  close,
  closeReschedule,
}: {
  transaction: programmedTransactionType;
  uid: string | undefined;
  close: () => void;
  closeReschedule: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<reprogramType>({
    resolver: zodResolver(reprogramSchema),
  });
  const supabase = createClient();
  const router = useRouter();

  const onSubmit: SubmitHandler<reprogramType> = async (data) => {
    await reprogramProgrammed(supabase, uid, transaction, data.futureTime);
    router.refresh();
    closeReschedule();
  };

  const handleOnlyRecieve = async () => {
    await deleteProgrammed(supabase, transaction.id as number);
    await addTransaction(supabase, uid, transaction);
    router.refresh();
    closeReschedule();
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="bg-light-bg w-[30rem] h-[20rem] px-5 rounded-md flex flex-col justify-around"
    >
      <div className="grid">
        Você deseja programar essa mesma transação para outro momento?
        <p className="py-2">
          "{transaction.name}" uma
          {transaction.type == "income" ? " entrada " : " saída "}de R$
          {transaction.value.toFixed(2).replace(".", ",")}
        </p>
        <select
          id=""
          className="outline-1 outline outline-black px-2"
          {...register("futureTime")}
        >
          <option value="1">Amanhã</option>
          <option value="7">Semana que vem</option>
          <option value="14">Duas semanas</option>
          <option value="15">Daqui 15 dias</option>
          <option value="30">Daqui 30 dias</option>
          <option value="month">Mesmo dia, mês que vem</option>
        </select>
      </div>
      <div className="flex justify-around">
        <button type="button" onClick={handleOnlyRecieve}>
          Não, só receber mesmo!
        </button>
        <button type="submit">Vamos reprogramar!</button>
      </div>
    </form>
  );
};
