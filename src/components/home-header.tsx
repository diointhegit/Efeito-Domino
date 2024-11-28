"use client";

import { MainHeader, SecondHeader } from "@/app/app/(main)/home/saldo";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const HomeHeader = ({
  user,
  monthBalance,
}: {
  user: { name: string; balance: number };
  monthBalance: number;
}) => {
  const [isMainHeader, setMainHeader] = useState(true);

  const toggleHeader = () => {
    setMainHeader(!isMainHeader);
  };

  return (
    <div className="px-12 py-5 bg-primary text-light-text flex gap-10">
      {isMainHeader && <MainHeader name={user?.name} balance={user?.balance} />}
      <div className="min-h-[100px] w-0.5 bg-white grid items-center ">
        {isMainHeader && (
          <FaAngleRight
            size={50}
            className="md:hidden"
            onClick={toggleHeader}
          />
        )}
        {!isMainHeader && (
          <FaAngleLeft
            size={50}
            className="md:hidden "
            onClick={toggleHeader}
          />
        )}
      </div>

      <SecondHeader monthBalance={monthBalance} isOn={!isMainHeader} />
    </div>
  );
};
