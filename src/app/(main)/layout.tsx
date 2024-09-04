import { Nav } from "@/components/nav";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="  gap-52 bg-dark-bg h-screen text-light-text">
      <div className="w-full flex md:justify-around justify-between items-center px-5 py-5 bg-dark-bg">
        <div className="cursor-pointer bg-light-bg p-3 rounded-lg flex items-center">
          <Image src={"/game.svg"} width={50} height={50} alt="domino" />
          <p className="lg:text-2xl text-dark-text">Efeito Dominó</p>
        </div>

        <FaUser className="size-10" />
      </div>
      {/* <Nav /> */}
      <div>{children}</div>
    </main>
  );
}
