import CopyIconSVG from './copy.svg';
type Props = {
  width: number;
  height: number;
  color?: string;
};

export default function CopyIcon({ width, height, color }: Props) {
  return (
    <div>
      <CopyIconSVG width={width} fill={color} height={height}></CopyIconSVG>
    </div>
  );
}
