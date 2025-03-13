"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton } from "./close-button";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransactionSchema, transactionSchema } from "@/lib/schemas";
import { BR$Input } from "./currency-input";
import { createClient } from "@/utils/supabase/client";
import {
  addToControl,
  addTransaction,
  getBalance,
  getControl,
  quickControlType,
  updateBalance,
} from "@/lib/supabase-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

export function AddTransaction({
  close,
  categories,
  uid,
}: {
  close: () => void;
  categories: { name: string; id: number; value: number }[];
  uid: string | undefined;
}) {
  const [isDebt, setIsDebt] = useState(false);
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
    if (!isDebt) {
      data.type == "Income";
    }
    if (data.category) {
      const category = data.category.split(" ");

      (data.categoryId = Number(category[0])),
        (data.categoryName = category[1]);
      data.categoryValue = Number(category[2]);
      await addTransaction(supabase, uid, data);
      const balance = await getBalance(supabase, uid);
      await updateBalance(supabase, balance, data.value, data.type, uid);

      console.log(await addToControl(supabase, data.value, data.categoryId));
      router.refresh();
      close();
    }
  };
  const checkDebt = (e: any) => {
    if (e.target.value == "debt") {
      setIsDebt(true);
    } else {
      setIsDebt(false);
    }
  };

  return (
    <div
      id="addTransaction"
      className="inset-0 flex items-center justify-center absolute bg-black/75 transition-all duration-100 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[40rem] rounded-xl px-10 py-5 bg-white sm:h-[30rem] "
      >
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
              onBlur={(e) => checkDebt(e)}
              className="border-2  p-1.5 border-black rounded-md"
              name="type"
            >
              <option value="income">Entrada</option>
              <option value="debt">Saída</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}

            <label htmlFor="category">Categoria</label>
            <select
              {...register("category")}
              name="category"
              id=""
              className=" p-1.5 border-2 rounded-md border-black"
            >
              {isDebt && categories
                ? categories.map((category: quickControlType) => {
                    return (
                      <option value={`${category.id} ${category.name}`}>
                        {category.name}
                      </option>
                    );
                  })
                : ""}
              <option value="Undefined">Indefinido</option>
            </select>
            {errors.category && <p>{errors.category.message}</p>}
          </div>
          <div className="flex gap-5">
            <button
              className="border-2 px-5 py-2 rounded-md border-black hover:bg-blue-300 hover:border-1 shadow-sm ease-in-out duration-150"
              onClick={close}
            >
              Cancelar{" "}
            </button>
            <button
              type="submit"
              className="border-2 ease-in-out duration-150 bg-primary rounded-md text-light-text px-5 shadow-sm py-2 hover:bg-light-bg hover:text-primary hover:border-primary hover:border-2"
            >
              Adicionar transação{" "}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
