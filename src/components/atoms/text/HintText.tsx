type Props = { children: React.ReactNode; className?: string };

export default function HintText({ children }: Props) {
  return <p className={`text-medium-small text-hint`}>{children}</p>;
}
