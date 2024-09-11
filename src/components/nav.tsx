"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Nav() {
  const path = usePathname();
  let navclasses = "group relative text-3xl ";
  return (
    <nav className="">
      <div className="grid gap-2">
        <Link
          href={"/home"}
          className={cn(navclasses, path == "/home" ? "text-primary" : "")}
        >
          Início
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-2 bg-secondary group-hover:w-full"></span>
        </Link>
        <Link
          href={"/statement"}
          className={cn(navclasses, path == "/statement" ? "text-primary" : "")}
        >
          Extrato
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-2 bg-secondary group-hover:w-full"></span>
        </Link>
        <Link
          href={"/programmed"}
          className={cn(
            navclasses,
            path == "/programmed" ? "text-primary" : ""
          )}
        >
          Programadas
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-2 bg-secondary group-hover:w-full"></span>
        </Link>
        <Link
          href={"/goals"}
          className={cn(navclasses, path == "/goals" ? "text-primary" : "")}
        >
          Metas
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-2 bg-secondary group-hover:w-full"></span>
        </Link>
        <Link
          href={"/profile"}
          className={cn(navclasses, path == "/profile" ? "text-primary" : "")}
        >
          Perfil
          <span className="absolute -bottom-1 left-0 w-0 transition-all h-2 bg-secondary group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
}

export function LandingPageNav() {
  return <nav></nav>;
}
