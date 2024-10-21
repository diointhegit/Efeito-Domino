import { date, z } from "zod";

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

export const programmedTransactionSchema = z.object({
  id: z.optional(z.number()),
  date: z.coerce.date({
    errorMap: ({ code }, { defaultError }) => {
      if (code == "invalid_date") return { message: "Data incorreta" };
      return { message: defaultError };
    },
  }),
  name: z
    .string()
    .min(1, { message: "A transação programada precisa de um nome" }),
  value: z
    .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(0.0001, { message: "O valor precisa ser maior que zero" })
        .max(999999999)
    ),
  user_id: z.optional(z.string()),
  category: z.string().trim().optional(),
  type: z.string({ required_error: "Essa transação precisa de um tipo" }),
});

export type programmedTransactionType = z.infer<
  typeof programmedTransactionSchema
>;
