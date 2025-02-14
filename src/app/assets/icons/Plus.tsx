import PlusIconSVG from './plus.svg';

type Props = {
  width: number;
  height: number;
};

export default function Plus({ width, height }: Props) {
  return (
    <div className="">
      <PlusIconSVG width={width} height={height}></PlusIconSVG>
    </div>
  );
}
