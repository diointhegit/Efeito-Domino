export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-dark-bg flex items-center justify-center w-screen h-screen dark:bg-dark-bg">
      {children}
    </main>
  );
}
