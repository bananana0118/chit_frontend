import RefreshIconSVG from './refreahIcon.svg';

type Props = {
  width: number;
  height: number;
};

export default function RefreshIcon({ width, height }: Props) {
  return (
    <div className="mr-1">
      <RefreshIconSVG width={width} height={height}></RefreshIconSVG>
    </div>
  );
}
