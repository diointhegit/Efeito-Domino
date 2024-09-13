"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();
  const supabase = createClient();

  const unsign = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }
    console.log("oi");
    router.push("/login");
  };

  return (
    <p className="cursor-pointer" onClick={unsign}>
      {" "}
      Deslogar{" "}
    </p>
  );
};
