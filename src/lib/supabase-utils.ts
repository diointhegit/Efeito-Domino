import { TransactionSchema } from "./schemas";

export const getBalance = async (supabase: any, uid: string | undefined) => {
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("user_id", uid);
  if (error) {
    return error;
  }
  return data[0].balance;
};

export const updateBalance = async (
  supabase: any,
  balance: number,
  value: number,
  type: string,
  uid: string | undefined
) => {
  console.log(uid);

  if (type == "debt") {
    const { error } = await supabase
      .from("user")
      .update({
        balance: balance - value,
      })
      .eq("user_id", uid);
    if (error) return error;
  } else {
    const { error } = await supabase
      .from("user")
      .update({
        balance: balance + value,
      })
      .eq("user_id", uid);
    if (error) return error;
  }
  return;
};

export const getUser = async (id: string | undefined, supabase: any) => {
  const { data, error } = await supabase.from("user").select().eq("id", id);
  if (error) {
    return error;
  }
  return data[0];
};

export const getProgrammed = async (supabase: any, uid: string | undefined) => {
  const { data, error } = await supabase
    .from("programmed")
    .select()
    .eq("user_id", uid);
  if (error) {
    return error;
  }
  return data[0].balance;
};

export const updateStatement = async (
  supabase: any,
  uid: string | undefined,
  formData: TransactionSchema
) => {
  const { error } = await supabase
    .from("statement")
    .insert({
      name: formData.name,
      created_at: new Date(),
      value: formData.value,
      user_id: uid,
      category: formData.category,
      type: formData.type,
    })
    .eq("user_id", uid);
  if (error) {
    console.log(error);
  }
  console.log("foi");
};
