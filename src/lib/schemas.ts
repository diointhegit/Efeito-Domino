import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Essa transação precisa de um nome!",
  }),
  // value: z.string().transform((val)=> val.replace(",",".")).number().gt(0, { message: "Valor precisa ser maior que 0" }),

  value: z
    .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(0.0001, { message: "O valor precisa ser maior que zero" })
        .max(999999999)
    ),
  date: z.preprocess(() => new Date(), z.date()),
  category: z.string().trim().optional(),
  type: z.string({ required_error: "Essa transação precisa de um tipo" }),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
