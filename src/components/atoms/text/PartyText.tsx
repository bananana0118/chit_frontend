type Props = {
  index: number;
};

export default function PartyText({ index }: Props) {
  return (
    <p className="mb-2 mt-2 text-sm">
      <span className="text-bold-small text-secondary">{index + 1}번</span> 파티
    </p>
  );
}
