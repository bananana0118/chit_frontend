import NaverLogoSvg from './logo_naver.svg';

type Props = {
  width: number;
  height: number;
};

export default function NaverLogo({ width, height }: Props) {
  return (
    <div className="mr-1">
      <NaverLogoSvg width={width} height={height}></NaverLogoSvg>
    </div>
  );
}
