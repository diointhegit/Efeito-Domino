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
} from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addYears } from "date-fns";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddProgrammedTransaction = ({
  close,
  uid,
}: {
  close: () => void;
  uid: string | undefined;
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

  // submitting the form
  const onSubmit: SubmitHandler<programmedTransactionType> = async (data) => {
    await addProgrammedTransaction(supabase, uid as string, data);
    close();
    router.refresh();
  };

  return (
    <div
      id="programmedId"
      className="flex inset-0 h-screen w-screen absolute bg-black/40 justify-center items-center"
    >
      <div className="bg-white w-[40rem] ">
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
            <option className=" p-1.5 rounded-md"> Indefinido </option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}

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
