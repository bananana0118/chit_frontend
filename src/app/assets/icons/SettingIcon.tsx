import SettingIconSVG from './settings.svg';
type Props = {
  width: number;
  height: number;
  color?: string;
};

export default function SettingIcon({ width, height, color }: Props) {
  return (
    <div>
      <SettingIconSVG
        width={width}
        fill={color}
        height={height}
      ></SettingIconSVG>
    </div>
  );
}
