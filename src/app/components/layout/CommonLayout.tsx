type Props = { children: React.ReactNode };

export default function CommonLayout({ children }: Props) {
  return (
    <main className="flex-h-1 flex h-fixed-screen w-fixed-screen flex-col items-center justify-center bg-transparent px-5 pb-5">
      {children}
    </main>
  );
}
