import CopyIconSVG from './copy.svg';
type Props = {
  width: number;
  height: number;
  color?: string;
  className?: string;
  onClickHandler?: () => Promise<void>;
};

export default function CopyIcon({
  width,
  height,
  color = '#38C958',
  className,
  onClickHandler,
}: Props) {
  return (
    <div className={`cursor-pointer ${className}`} onClick={onClickHandler}>
      <CopyIconSVG width={width} fill={color} height={height}></CopyIconSVG>
    </div>
  );
}
