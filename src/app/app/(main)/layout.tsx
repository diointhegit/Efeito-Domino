import { createClient } from "@/utils/supabase/server";
import { Nav, NavLinks } from "@/components/nav";

import Image from "next/image";
import { FaBars, FaHamburger, FaUser } from "react-icons/fa";
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
    <main className="gap-52  h-screen text-dark-text">
      <NavLinks />
      <div className="md:hidden  grid justify-end">
        <Nav />
      </div>
      <div>{children}</div>
    </main>
  );
}
