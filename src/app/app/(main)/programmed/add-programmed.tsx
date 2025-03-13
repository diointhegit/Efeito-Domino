import { CloseButton } from "@/components/close-button";
import { BR$Input } from "@/components/currency-input";
import {
  programmedTransactionSchema,
  programmedTransactionType,
} from "@/lib/schemas";
import {
  addProgrammedTransaction,
  getUid,
  getUser,
  quickControlType,
} from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addYears } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddProgrammedTransaction = ({
  uid,
  close,
  categories,
}: {
  uid: string | undefined;
  close: () => void;
  categories: { name: string; id: number; value: number }[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<programmedTransactionType>({
    resolver: zodResolver(programmedTransactionSchema),
  });
  // creating the consts used
  const router = useRouter();
  const supabase = createClient();
  const todayDate = new Date().toISOString();
  const inThreeYears = addYears(new Date(), 2).toISOString();
  const [isDebt, setIsDebt] = useState(false);

  const checkDebt = (e: any) => {
    if (e.target.value == "debt") {
      setIsDebt(true);
    } else {
      setIsDebt(false);
    }
  };

  console.log(categories);

  // submitting the form
  const onSubmit: SubmitHandler<programmedTransactionType> = async (data) => {
    await addProgrammedTransaction(supabase, uid as string, data);
    close();
    router.refresh();
  };

  return (
    <div
      id="programmedId"
      className="flex inset-0 absolute bg-black/60 justify-center items-center px-5"
    >
      <div className="bg-white md:w-[40rem] rounded-md">
        <div className="flex items-center justify-between px-14 py-3">
          <p className="text-2xl">Programe uma transação</p>
          <CloseButton close={close} size={20} containerId="programmedId" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-10 py-5">
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

          <label htmlFor="date">Data</label>
          <input
            {...register("date")}
            type="date"
            className="border-2  p-1.5 border-black rounded-md"
            min={todayDate.slice(0, 10)}
            max={inThreeYears.slice(0, 10)}
          />
          {errors.date && <p>{errors.date.message}</p>}
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

          <div className="flex gap-5 py-5">
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
};
