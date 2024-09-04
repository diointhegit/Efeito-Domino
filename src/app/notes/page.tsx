import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("notes").select();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
