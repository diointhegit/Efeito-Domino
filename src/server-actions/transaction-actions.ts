"use server";

import { transactionSchema, TransactionSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export async function submitTransaction(formData: FormData) {
  try {
    // fake a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //validate the FormData
    const validatedFields = transactionSchema.parse({
      name: formData.get("name"),
      value: formData.get("value"),
      date: formData.get("date"),
      type: formData.get("type"),
      category: formData.get("category"),
    });

    console.log({ validatedFields });

    // send validated data to database here

    return {
      errors: null,
      data: "data received and mutated",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.message);
      return {
        errors: transformZodErrors(error),
        data: null,
      };
    }

    return {
      errors: {
        message: "An unexpected error occurred. Could not create shelf.",
      },
      data: null,
    };
  }
}

export async function getSupabase() {
  const supabase = createClient();
  return supabase;
}
