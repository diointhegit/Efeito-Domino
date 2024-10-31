import { SupabaseClient } from "@supabase/supabase-js";
import { programmedTransactionType, TransactionSchema } from "./schemas";
import { transactionType } from "./types";

export const getBalance = async (
  supabase: SupabaseClient,
  uid: string | undefined
) => {
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
  supabase: SupabaseClient,
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

export const getUser = async (
  id: string | undefined,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("user_id", id);
  if (error) {
    return error;
  }
  return data[0];
};

export const getProgrammed = async (
  supabase: SupabaseClient,
  uid: string | undefined
) => {
  const { data, error } = await supabase
    .from("programmed")
    .select()
    .eq("user_id", uid);
  if (error) {
    return error;
  }
  return data;
};

export const getGoals = async (
  supabase: SupabaseClient,
  uid: string | undefined
) => {
  const { data, error } = await supabase
    .from("goals")
    .select()
    .eq("user_id", uid);
  if (error) {
    return error;
  }
  return data;
};

export const addTransaction = async (
  supabase: SupabaseClient,
  uid: string | undefined,
  formData: TransactionSchema
) => {
  const date = new Date();
  console.log(date);
  const { error } = await supabase
    .from("statement")
    .insert({
      name: formData.name,
      created_at: date,
      value: formData.value,
      user_id: uid,
      category: formData.category,
      type: formData.type,
    })
    .eq("user_id", uid);
  if (error) {
    console.log(error);
  }
};

export const getUid = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getUser();
  if (data) {
    if (data.user) return data.user.id;
  }
};

export const deleteProgrammed = async (
  supabase: SupabaseClient,
  transactionId: number
) => {
  const response = await supabase
    .from("programmed")
    .delete()
    .eq("id", transactionId);

  console.log(response);
  return response;
};

export const programmedToStatement = async (
  supabase: SupabaseClient,
  transaction: programmedTransactionType
) => {
  if (transaction.id) {
    let user = await getUser(transaction.user_id, supabase);
    await addTransaction(supabase, transaction.user_id, transaction);
    console.log(user, transaction.value, transaction.type, transaction.user_id);
    await updateBalance(
      supabase,
      user.balance,
      transaction.value,
      transaction.type,
      transaction.user_id
    );

    return await deleteProgrammed(supabase, transaction.id);
  }
};

export const addProgrammedTransaction = async (
  supabase: SupabaseClient,
  uid: string,
  transaction: programmedTransactionType
) => {
  const { error } = await supabase
    .from("programmed")
    .insert({
      name: transaction.name,
      date: transaction.date,
      value: transaction.value,
      user_id: uid,
      category: transaction.category,
      type: transaction.type,
    })
    .eq("user_id", uid);
  if (error) {
    console.log(error);
    return;
  }
  return "foi";
};

export const getControls = async (
  supabase: SupabaseClient,
  id: string | undefined
) => {
  const { data, error } = await supabase
    .from("controls")
    .select()
    .eq("user_id", id);
  if (error) {
    return error;
  }
  return data;
};

// auth functions

export const supabaseLogOut = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();
};
