import { createClient } from "@/utils/supabase/server";
import { Nav } from "@/components/nav";

import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { SignOutButton } from "./statement/logoutbutton";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseLogOut } from "@/lib/supabase-utils";
import { LogoutButton } from "@/components/logout-button";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  let uid = data.user?.id;
  if (!uid) {
    redirect("/app/login");
  }
  return (
    <main className="  gap-52  h-screen text-dark-text">
      <div className="w-full flex  justify-between items-center px-20 py-5 bg-light-bg">
        <Link
          href="/app/home"
          className="cursor-pointer bg-light-bg p-3 rounded-lg flex items-center"
        >
          <Image src={"/game.svg"} width={30} height={30} alt="domino" />
          Início
        </Link>

        <Link
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          href="statement"
        >
          {" "}
          Extrato{" "}
        </Link>
        <Link
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          href="programmed"
        >
          {" "}
          Programações{" "}
        </Link>
        <Link
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          href="controls"
        >
          {" "}
          Controles{" "}
        </Link>
        <Link
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          href="goals"
        >
          {" "}
          Metas{" "}
        </Link>
        <Link
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          href="teachings"
        >
          {" "}
          Educacional{" "}
        </Link>

        <div className="dropdown-menu">
          <FaUser size={25} className="hover:text-primary " />
          <LogoutButton />
        </div>
      </div>
      {/* <Nav /> */}
      <div>{children}</div>
    </main>
  );
}
