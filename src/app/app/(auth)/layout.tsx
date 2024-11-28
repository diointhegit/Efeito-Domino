import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" bg-light-bg flex items-center justify-center w-screen h-screen ">
      <div>
        <Link href="/" className="flex justify-center my-2">
          <Image src="/game.svg" width={50} height={50} alt="3 dominos" />
        </Link>

        {children}
      </div>
      <Toaster />
    </main>
  );
}
