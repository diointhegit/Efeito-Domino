export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#EBDDFF] flex items-center justify-center w-screen h-screen ">
      {children}
    </main>
  );
}
