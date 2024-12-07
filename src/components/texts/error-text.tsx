"use client";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { motion } from "motion/react";

export const InputErrorMessage = ({
  message,
}: {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-pink-400 underline font-bold  py-2"
    >
      {String(message)}
    </motion.p>
  );
};
