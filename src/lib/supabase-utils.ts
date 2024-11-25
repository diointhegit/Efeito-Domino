import { SupabaseClient } from "@supabase/supabase-js";
import {
  controlType,
  goalType,
  programmedTransactionType,
  reprogramType,
  TransactionSchema,
} from "./schemas";
import { transactionType } from "./types";
import {
  addDays,
  addMonths,
  constructFrom,
  constructNow,
  isPast,
  isSameDay,
} from "date-fns";
import { TZDate } from "@date-fns/tz";
import { getNewControlDate } from "./utils";
import { getDate } from "date-fns/fp";

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
  console.log(formData);
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

  if (
    formData.categoryId &&
    formData.categoryName &&
    formData.categoryValue &&
    formData.categoryName != "Undefined"
  ) {
    addToControl(supabase, formData.value, formData.categoryId);
  }
};

export type quickControlType = {
  name: string;
  id: number;
  value: number;
};
export const addToControl = async (
  supabase: SupabaseClient,
  value: number,
  categoryId: number
) => {
  let category = await getControl(supabase, categoryId);
  const newValue = category.spentValue + value;
  console.log(category.spentValue, value, newValue);
  category.spentValue = newValue;

  console.log(category);
  const { error } = await supabase
    .from("controls")
    .update(category)
    .eq("id", categoryId);

  if (error) return error;
  return "irra";
};

export const getControl = async (supabase: SupabaseClient, id: number) => {
  const { data, error } = await supabase.from("controls").select().eq("id", id);

  if (error) return error;
  return data[0];
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

export const needsReset = (controls: any[]) => {
  const tzDate = new TZDate(new Date(), "America/Sao_Paulo");
  let toReset: any[];
  toReset = [];
  controls.forEach((control) => {
    if (isSameDay(control.until, tzDate) || isPast(control.until)) {
      toReset.push(control);
    }
  });
  return toReset;
};

export const resetControl = async (
  supabase: SupabaseClient,
  id: string | undefined,
  control: any
) => {
  const tzDate = new TZDate(new Date(), "America/Sao_Paulo");

  let resetedControl = control;
  resetedControl.spentValue = 0;
  resetedControl.until = getNewControlDate(tzDate, control.periodicity);

  await updateControl(supabase, id, resetedControl);
};

// auth functions

export const supabaseLogOut = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();
};

export const reprogramProgrammed = async (
  supabase: SupabaseClient,
  uid: string | undefined,
  transaction: programmedTransactionType,
  futureTime: string
) => {
  console.log(transaction);
  if (futureTime == "month") {
    transaction.date = addMonths(transaction.date, 1);
    await addProgrammedTransaction(supabase, uid as string, transaction);
    return;
  }

  transaction.date = addDays(new Date(), Number(futureTime));
  await addProgrammedTransaction(supabase, uid as string, transaction);
  return;
};

export const updateControl = async (
  supabase: SupabaseClient,
  uid: string | undefined,
  control: controlType
) => {
  console.log(control.id);
  const { error } = await supabase
    .from("controls")
    .update(control)
    .eq("id", control.id);

  if (error) return error;
};

export const getCategories = async (
  supabase: SupabaseClient,
  uid: string | undefined
) => {
  const controls = await getControls(supabase, uid);
  let categories = controls.map((category: any) => {
    return { name: category.name, id: category.id, value: category.spentValue };
  });
  return categories;
};

export const createControl = async (
  supabase: SupabaseClient,
  control: controlType
) => {
  const { error } = await supabase.from("controls").insert(control);

  if (error) return error;
};

export const saveToGoal = async (
  supabase: SupabaseClient,
  balance: number,
  value: number,
  goal: goalType
) => {
  const newGoalValue = goal.achieved_value + value;
  goal.achieved_value = newGoalValue;
  console.log(goal);
  const { error } = await supabase.from("goals").update(goal).eq("id", goal.id);
  if (error) console.log(error);
  await updateBalance(supabase, balance, value, "debt", goal.user_id);
};

export const createGoal = async (supabase: SupabaseClient, goal: goalType) => {
  const { error } = await supabase.from("goals").insert(goal);
  if (error) console.log(error);
};
