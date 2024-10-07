export const getBalance = async (supabase: any, uid: string | undefined) => {
  const { data, error } = await supabase.from("user").select().eq("id", uid);
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
      .eq("id", uid);
    if (error) return error;
  } else {
    const { error } = await supabase
      .from("user")
      .update({
        balance: balance + value,
      })
      .eq("id", uid);
    if (error) return error;
  }
};
