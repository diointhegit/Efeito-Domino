"use client";

import { ControlSchema, controlType } from "@/lib/schemas";
import { getNewControlDate, periodicities } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { BR$Input } from "./currency-input";
import { useState } from "react";
import { addDays, addMonths, format } from "date-fns";
import { BRStringDateToDate, dateToBRStringDate } from "@/lib/timefns";
import { getUid, updateControl } from "@/lib/supabase-utils";
import { createBrowserClient } from "@supabase/ssr";
import { CloseButton } from "./close-button";

export function EditControlForm({
  control,
  handleCloseEdit,
}: {
  control: any;
  handleCloseEdit: () => void;
}) {
  //Setting up variables

  const [periodicity, setPeriodicity] = useState(control.periodicity);
  const [changePeriodicity, setChangePeriodicity] = useState(false);
  const [until, setUntil] = useState(control.until);
  const supabase = createClient();
  const router = useRouter();
  // Setting up functions
  const onSubmit: SubmitHandler<controlType> = async (data) => {
    const uid = await getUid(supabase);
    data.spentValue = control.spentValue;
    data.user_id = control.user_id;
    data.until = until;
    data.id = control.id;
    data.periodicity = periodicity;
    await updateControl(supabase, uid, data);
    handleCloseChangePeriodicity();
    handleCloseEdit();
    router.refresh();
  };

  const handleOpenChangePeriodicity = () => {
    setChangePeriodicity(true);
  };
  const handleCloseChangePeriodicity = () => {
    setChangePeriodicity(false);
  };
  const handlePeriodicityChange = (e: any) => {
    setPeriodicity(e.target.value);

    setUntil(
      format(getNewControlDate(new Date(), e.target.value), "yyyy-MM-dd")
    );
    handleCloseChangePeriodicity();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<controlType>({
    resolver: zodResolver(ControlSchema),
  });
  console.log(errors);
  console.log(control);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid py-5 px-5">
      <CloseButton close={handleCloseEdit} />
      <p>Controle:</p>
      <input
        {...register("name")}
        type="text"
        defaultValue={control.name}
        className="border-2 w-full   p-1.5 border-black rounded-md"
      />
      <p>Valor limite</p>
      <BR$Input
        name="value"
        className="border-2   p-1.5 border-black rounded-md"
        register={register}
        defaultValue={control.controlValue}
        registerName={"controlValue"}
      />
      <label htmlFor="untilDate">Data para resetar novamente</label>
      <input
        type="text"
        {...register("until")}
        value={dateToBRStringDate(until)}
      />
      <p>
        Se reseta{" "}
        <b
          className="hover:cursor-pointer"
          onClick={handleOpenChangePeriodicity}
        >
          {periodicity}
        </b>
      </p>
      {changePeriodicity && (
        <div className="absolute flex justify-center items-center bg-black/60 inset-0">
          <div className="bg-white w-32">
            <p>Mudar a periodicidade</p>

            <select
              name="periodicity"
              onChange={(e) => handlePeriodicityChange(e)}
            >
              <option value={periodicities[0]}>Selecione</option>
              {periodicities.map((period: string) => {
                return <option value={period}>{period}</option>;
              })}
            </select>
          </div>
        </div>
      )}
      <button type="submit" className="px-5 border border-1 border-black">
        {" "}
        Editar{" "}
      </button>
    </form>
  );
}
