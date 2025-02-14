import AlertIconSVG from './alert.svg';
type Props = {
  width: number;
  height: number;
  className: string;
};

export default function AlertIcon({ width, height, className }: Props) {
  return (
    <div className={className}>
      <AlertIconSVG width={width} height={height}></AlertIconSVG>
    </div>
  );
}
