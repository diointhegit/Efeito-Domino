import { createClient } from "@/utils/supabase/server";
import { isSameDay, isToday, startOfDay, subHours } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const today = new Date();
  const { data, error } = await supabase
    .from("controls")
    .update({ status: "pendingReset" })
    .eq("until", today.toISOString().slice(0, 10))
    .select();

  console.log(data);

  if (error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );

  return new NextResponse("Atualizado", { status: 200 });
}
