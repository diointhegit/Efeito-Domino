"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaUser, FaXbox, FaXingSquare } from "react-icons/fa";
import { LogoutButton } from "./logout-button";
import { CloseButton } from "./close-button";
import { BiSolidXCircle, BiX } from "react-icons/bi";
import { AnimatePresence, motion } from "motion/react";
export function Nav() {
  const path = usePathname();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const animateAndClose = () => {
    setOpen(false);
  };

  return (
    <nav className="py-2">
      <FaBars size={20} onClick={handleOpen} />
      <AnimatePresence>
        {isOpen && (
          <div className="bg-black/80 fixed  w-full inset-0 ">
            <motion.div
              initial={{ x: +350 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
              transition={{ type: "tween" }}
              className="bg-light-bg h-full  w-2/3 absolute right-0 z-20 "
            >
              <div className="flex justify-end w-full py-2 px-5">
                <BiX onClick={handleClose} size={30} />
              </div>
              <div className=" my-6 ">
                <Link
                  onClick={handleClose}
                  href="/app/home"
                  className={cn(
                    "relative  block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left px-5 py-5 w-full",
                    path == "/app/home" ? "bg-primary w-full" : ""
                  )}
                >
                  Início
                </Link>

                <Link
                  onClick={handleClose}
                  className={cn(
                    "relative w-full block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left px-5 py-5",
                    path == "/app/statement" ? "bg-primary w-full" : ""
                  )}
                  href="statement"
                >
                  {" "}
                  Extrato{" "}
                </Link>
                <Link
                  onClick={handleClose}
                  className={cn(
                    "relative w-full block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left px-5 py-5",
                    path == "/app/programmed" ? "bg-primary w-full" : ""
                  )}
                  href="programmed"
                >
                  {" "}
                  Programações{" "}
                </Link>
                <Link
                  onClick={handleClose}
                  className={cn(
                    "relative w-full block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left px-5 py-5",
                    path == "/app/controls" ? "bg-primary w-full" : ""
                  )}
                  href="controls"
                >
                  {" "}
                  Controles{" "}
                </Link>
                <Link
                  onClick={handleClose}
                  className={cn(
                    "relative w-full block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left px-5 py-5",
                    path == "/app/goals" ? "bg-primary w-full" : ""
                  )}
                  href="goals"
                >
                  {" "}
                  Metas{" "}
                </Link>
                <Link
                  onClick={handleClose}
                  className={cn(
                    "relative w-full block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left px-5 py-5",
                    path == "/app/teachings" ? "bg-primary w-full" : ""
                  )}
                  href="teachings"
                >
                  {" "}
                  Educacional{" "}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export const NavLinks = () => {
  return (
    <div className="w-full md:flex  justify-between items-center px-20 py-5 bg-light-bg hidden">
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
  );
};
