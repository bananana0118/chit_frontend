type Props = { children: React.ReactNode };

export default function PageLayout({ children }: Props) {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
}
