"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton } from "./close-button";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransactionSchema, transactionSchema } from "@/lib/schemas";
import { BR$Input } from "./currency-input";
import { createClient } from "@/utils/supabase/client";
import { getBalance, updateBalance } from "@/lib/supabase-utils";
import { useRouter } from "next/navigation";
export function AddTransaction({
  close,
  uid,
}: {
  close: () => void;
  uid: string | undefined;
}) {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit: SubmitHandler<TransactionSchema> = async (data) => {
    const updateStatement = async () => {
      const { error } = await supabase.from("statement").insert({
        name: data.name,
        created_at: data.date,
        value: data.value,
        userid: uid,
        category: data.category,
        type: data.type,
      });
      if (error) {
        console.log(error);
      }
      console.log("foi");
    };
    updateStatement();
    const balance = await getBalance(supabase, uid);
    await updateBalance(supabase, balance, data.value, data.type, uid);
    router.refresh();
    close();
  };

  return (
    <div
      id="addTransaction"
      className="inset-0 flex items-center justify-center absolute bg-black/75 transition-all duration-100 "
    >
      <div className="w-[40rem] rounded-xl px-10 py-5 bg-white h-[30rem] ">
        <div className="flex items-center justify-between px-14 py-3">
          <p className="text-2xl">Adicionar uma transação</p>
          <CloseButton close={close} size={20} containerId="addTransaction" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10">
          <div className="grid">
            <label htmlFor="name">Nome</label>
            <input
              {...register("name")}
              type="text"
              className="border-2  p-1.5 border-black rounded-md"
              name="name"
            />
            {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor="value">Valor</label>

            <BR$Input
              name="value"
              className="border-2   p-1.5 border-black rounded-md"
              register={register}
              registerName={"value"}
            />
            {errors.value && <p>{errors.value.message}</p>}

            <label htmlFor="type">Tipo</label>
            <select
              {...register("type")}
              className="border-2  p-1.5 border-black rounded-md"
              name="type"
            >
              <option value="income">Entrada</option>
              <option value="debt">Saída</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}

            <label htmlFor="category">Categoria</label>
            <select
              name="category"
              id=""
              className=" p-1.5 border-2 rounded-md border-black"
            >
              <option className=" p-1.5 rounded-md"> Indefinido </option>
            </select>
            {errors.category && <p>{errors.category.message}</p>}
          </div>
          <div className="flex gap-5 py-5 ">
            <button type="submit" className="border border-black px-5 py-2">
              Adicionar transação{" "}
            </button>
            <button className="border border-black px-5 py-2" onClick={close}>
              Cancelar{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
