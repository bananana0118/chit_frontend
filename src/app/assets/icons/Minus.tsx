import MinusIconSVG from './Minus.svg';

type Props = {
  width: number;
  height: number;
};

export default function Minus({ width, height }: Props) {
  return (
    <div className="">
      <MinusIconSVG width={width} height={height}></MinusIconSVG>
    </div>
  );
}
