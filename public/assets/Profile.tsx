import ProfileSVG from './profile_temp.svg';

type Props = {
  width: number;
  height: number;
};

export default function Profile({ width, height }: Props) {
  return (
    <ProfileSVG
      className="shadow-inset-primary"
      width={width}
      height={height}
    ></ProfileSVG>
  );
}
