"use client";
import { supabaseLogOut } from "@/lib/supabase-utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabaseLogOut(supabase);
    router.push("/");
  };
  const supabase = createClient();
  return (
    <div className="dropdown-container" onClick={handleLogout}>
      Deslogar
    </div>
  );
};
