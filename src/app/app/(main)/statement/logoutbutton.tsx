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
    <p
      className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left cursor-pointer"
      onClick={unsign}
    >
      {" "}
      Deslogar{" "}
    </p>
  );
};
