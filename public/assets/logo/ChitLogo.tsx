import ChitLogoM from './logo_medium.svg';

type Props = {
  width: number;
  height: number;
};

export default function ChitLogo({ width, height }: Props) {
  return <ChitLogoM width={width} height={height}></ChitLogoM>;
}
