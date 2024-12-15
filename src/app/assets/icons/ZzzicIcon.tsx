import ZzzicIconSVG from './zzzic_logo.svg';
type Props = {
  width: number;
  height: number;
};

export default function ZzzicIcon({ width, height }: Props) {
  return (
    <div>
      <ZzzicIconSVG width={width} height={height}></ZzzicIconSVG>
    </div>
  );
}
