"use client";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PostgrestError } from "@supabase/supabase-js";
export const MainHeader = ({
  name,
  balance,
}: {
  name: string;
  balance: number;
}) => {
  const [isEyeSlashed, setEyeSlashed] = useState(true);

  const handleEyeSlashed = () => {
    setEyeSlashed(!isEyeSlashed);
  };

  return (
    <div className="flex justify-between flex-col">
      <p className="text-5xl">Olá, {name}</p>
      <div>
        <div className="flex items-center gap-5">
          <p className="text-xl">Saldo disponível:</p>
          <FaEyeSlash
            onClick={handleEyeSlashed}
            className={cn(isEyeSlashed ? "block" : "hidden", "size-7 ")}
          />
          <IoEyeSharp
            onClick={handleEyeSlashed}
            className={cn(isEyeSlashed ? "hidden" : "", "size-7")}
          />
        </div>
        <div></div>
        <p
          className={cn(
            isEyeSlashed ? "hidden" : "block",
            "text-2xl font-bold"
          )}
        >
          {" "}
          R$ {String(Number(balance).toFixed(2)).replace(".", ",")}
        </p>
        <p className={cn(isEyeSlashed ? "" : "hidden", "text-2xl font-bold")}>
          {" "}
          R$ ????????
        </p>
      </div>
    </div>
  );
};

export const SecondHeader = ({
  monthBalance,
  isOn,
}: {
  monthBalance: number | PostgrestError | undefined;
  isOn: boolean;
}) => {
  const [isEyeSlashed, setEyeSlashed] = useState(true);
  monthBalance = Number.isNaN(monthBalance) ? 0.0 : monthBalance;
  console.log(monthBalance);
  const handleEyeSlashed = () => {
    setEyeSlashed(!isEyeSlashed);
  };
  return (
    <div
      className={cn(" justify-between flex-col md:flex", isOn ? "" : "hidden")}
    >
      <p className="md:text-4xl text-2xl"> Panorama mensal </p>
      <p className="md:text-md text-xs">
        {" "}
        Esse panorama leva em consideração seus próximos 30 dias
      </p>
      <div className="flex items-center gap-5">
        <p className="text-xl">Saldo previsto:</p>
        <FaEyeSlash
          onClick={handleEyeSlashed}
          className={cn(isEyeSlashed ? "block" : "hidden", "size-7 ")}
        />
        <IoEyeSharp
          onClick={handleEyeSlashed}
          className={cn(isEyeSlashed ? "hidden" : "", "size-7")}
        />
      </div>
      <p
        className={cn(isEyeSlashed ? "hidden" : "block", "text-2xl font-bold")}
      >
        {" "}
        R$ {String(Number(monthBalance).toFixed(2)).replace(".", ",")}
      </p>
      <p className={cn(isEyeSlashed ? "" : "hidden", "text-2xl font-bold")}>
        {" "}
        R$ ????????
      </p>
    </div>
  );
};
