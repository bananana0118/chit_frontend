import CopyIconSVG from './copy.svg';
type Props = {
  width: number;
  height: number;
  color?: string;
  className?: string;
};

export default function CopyIcon({
  width,
  height,
  color = '#38C958',
  className,
}: Props) {
  return (
    <div className={className}>
      <CopyIconSVG width={width} fill={color} height={height}></CopyIconSVG>
    </div>
  );
}
