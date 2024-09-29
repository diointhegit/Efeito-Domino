import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUser = async (id: string | undefined) => {
  const { data, error } = await supabase.from("user").select().eq("id", id);
  if (error) {
    return error;
  }
  return data[0];
};
