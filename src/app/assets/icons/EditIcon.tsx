import EditIconSVG from './edit.svg';
type Props = {
  width: number;
  height: number;
  color?: string;
  className?: string;
};

export default function EditIcon({ width, height, color, className }: Props) {
  return (
    <div className={className}>
      <EditIconSVG width={width} fill={color} height={height}></EditIconSVG>
    </div>
  );
}
