type Props = { children: React.ReactNode };

export default function StreamerLayoutWithButton({ children }: Props) {
  return (
    <main className="flex-h-1 flex h-fixed-screen w-fixed-screen flex-col items-center justify-center bg-slate-600 px-5 pb-14">
      {children}
    </main>
  );
}
