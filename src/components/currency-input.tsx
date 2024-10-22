import { cn } from "@/lib/utils";
import { useState } from "react";

export const BR$Input = ({
  name,
  register,
  registerName,
  className = "",
}: {
  name: string;
  registerName: string;
  className?: string;
  register: any;
}) => {
  const [inputValue, setInputValue] = useState("0,00");

  const normalizeBR$ = (value: string) => {
    value = value.replace(/[^\d,]/g, "");
    console.log("value inputado", inputValue);
    if (value.length > 2) {
      let cleanValue = value.replace(",", "");

      let decimalDigits = cleanValue.slice(
        cleanValue.length - 2,
        cleanValue.length
      );
      let numberDigits = cleanValue.slice(0, cleanValue.length - 2);

      if (inputValue.length >= 4 && value[0] == "0") {
        numberDigits = String(Number(numberDigits));
      }
      setInputValue(numberDigits + "," + decimalDigits);
      return;
    }
    if (Number(value.replace(",", ".")) <= 0.0) {
      setInputValue("0,00");
      return;
    }

    setInputValue(value);
    return;
  };

  const correctNumbers = () => {
    const value = String(Number(inputValue.replace(",", "."))).replace(
      ".",
      ","
    );
    normalizeBR$(value);
    console.log(inputValue);
  };

  return (
    <input
      name={name}
      onBlur={correctNumbers}
      {...register(registerName)}
      className={cn(className)}
      type="tel"
      value={inputValue}
      inputMode="numeric"
      placeholder="0,00"
      onChange={(e) => {
        normalizeBR$(e.target.value);
      }}
    />
  );

  // return (
  //   <NumericFormat
  //     value={value}
  //     onChange={(e) => setValue(e.target.value)}
  //     thousandSeparator="."
  //     decimalSeparator=","
  //     decimalScale={2}
  //     allowedDecimalSeparators={[","]}
  //   />
  // );
};
