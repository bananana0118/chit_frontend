import CancelIconSVG from './cancel.svg';
type Props = {
  width: number;
  height: number;
};

export default function Cancel({ width, height }: Props) {
  return (
    <div>
      <CancelIconSVG width={width} height={height}></CancelIconSVG>
    </div>
  );
}
