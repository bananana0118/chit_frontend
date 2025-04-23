import GameIconSVG from './gameicon.svg';

type Props = {
  width: number;
  height: number;
};

export default function GameIcon({ width, height }: Props) {
  return (
    <div className="mr-1">
      <GameIconSVG width={width} height={height}></GameIconSVG>
    </div>
  );
}
