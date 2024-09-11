import { createClient } from "@/utils/supabase/server";
import { Nav } from "@/components/nav";

import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { SignOutButton } from "./statement/logoutbutton";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  if (!uid) {
    redirect("/login");
  }
  return (
    <main className="  gap-52 bg-dark-bg h-screen text-light-text">
      <div className="w-full flex md:justify-around justify-between items-center px-5 py-5 bg-dark-bg">
        <div className="cursor-pointer bg-light-bg p-3 rounded-lg flex items-center">
          <Image src={"/game.svg"} width={30} height={30} alt="domino" />
          <p className=" text-dark-text">Efeito Dominó</p>
        </div>
        <SignOutButton />
      </div>
      {/* <Nav /> */}
      <div>{children}</div>
    </main>
  );
}
