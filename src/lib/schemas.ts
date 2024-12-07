import { date, z } from "zod";
import { BRStringDateToDate } from "./timefns";
import { TZDate } from "@date-fns/tz";
import { addHours } from "date-fns";

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
  category: z.string().optional(),
  categoryName: z.string().optional(),
  categoryId: z.number().optional(),
  categoryValue: z.number().optional(),
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

export const reprogramSchema = z.object({
  futureTime: z.string(),
});
export type reprogramType = z.infer<typeof reprogramSchema>;

export const ControlSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(1, { message: "Seu controle precisa de um nome" }),
  controlValue: z
    .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(0.0001, { message: "O valor precisa ser maior que zero" })
        .max(999999999)
    ),
  spentValue: z.optional(
    z
      .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
      .pipe(
        z.coerce
          .number()
          .min(0.0001, { message: "O valor precisa ser maior que zero" })
          .max(999999999)
      )
  ),
  until: z
    .string({ required_error: "Preencha a data" })
    .transform((dateString, ctx) => {
      console.log(dateString);
      const date = new Date(dateString);
      console.log(date, BRStringDateToDate(dateString));
      if (!z.date().safeParse(date).success) {
        ctx.addIssue({
          message: "Data inválida",
          code: z.ZodIssueCode.invalid_date,
        });
      }
      return date;
    }),
  periodicity: z.optional(z.string()),
  user_id: z.optional(z.string()),
});

export type controlType = z.infer<typeof ControlSchema>;

export const goalSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(1, { message: "Sua meta precisa de um nome" }),
  goal_value: z.optional(
    z
      .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
      .pipe(
        z.coerce
          .number()
          .min(0.0001, { message: "O valor precisa ser maior que zero" })
          .max(999999999)
      )
  ),
  achieved_value: z
    .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(0.0, { message: "O valor precisa ser maior que zero" })
        .max(999999999)
    ),
  until: z
    .string({ required_error: "Preencha a data" })
    .transform((dateString, ctx) => {
      console.log(dateString);
      const tzDate1 = addHours(new Date(dateString), 3);
      if (!z.date().safeParse(tzDate1).success) {
        ctx.addIssue({
          message: "Data inválida",
          code: z.ZodIssueCode.invalid_date,
          path: ["until"],
        });
      }
      return tzDate1;
    }),

  created_at: z
    .string({ required_error: "Preencha a data" })
    .transform((dateString, ctx) => {
      console.log(dateString);
      const date = new Date(dateString);
      console.log(date, BRStringDateToDate(dateString));
      if (!z.date().safeParse(date).success) {
        ctx.addIssue({
          message: "Data inválida",
          code: z.ZodIssueCode.invalid_date,
          path: [""],
        });
      }
      return date;
    }),
  user_id: z.optional(z.string()),
});

export type goalType = z.infer<typeof goalSchema>;

export const saveToGoalSchema = z
  .object({
    value: z
      .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
      .pipe(
        z.coerce
          .number()
          .min(0.0, { message: "O valor precisa ser maior que zero" })
          .max(999999999)
      ),
    balance: z
      .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
      .pipe(
        z.coerce
          .number()
          .min(0.0001, { message: "O valor precisa ser maior que zero" })
          .max(999999999)
      ),
    achieved_value: z
      .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
      .pipe(
        z.coerce
          .number()
          .min(0.0, { message: "O valor precisa ser maior que zero" })
          .max(999999999)
      ),
    goal_value: z
      .union([z.string().transform((x) => x.replace(",", ".")), z.number()])
      .pipe(
        z.coerce
          .number()
          .min(0.0, { message: "O valor precisa ser maior que zero" })
          .max(999999999)
      ),
  })
  .superRefine(({ value, balance, achieved_value, goal_value }, ctx) => {
    if (balance - value < 0) {
      ctx.addIssue({
        code: "custom",
        message: "Você não tem esse valor para guardar...",
        path: ["value"],
      });
    }

    if (achieved_value + value > goal_value) {
      ctx.addIssue({
        code: "custom",
        message: `Muito bom você querer guardar mais! Mas sua meta é de: ${goal_value}`,
        path: ["value"],
      });
    }
  });
export type saveToGoalType = z.infer<typeof saveToGoalSchema>;
