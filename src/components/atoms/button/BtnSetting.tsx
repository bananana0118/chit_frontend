import SettingIcon from '@/app/assets/icons/SettingIcon';

type Props = {
  onClickHandler: () => void;
};
export default function BtnSetting({ onClickHandler }: Props) {
  return (
    <div
      className="ml-2 flex cursor-pointer items-center"
      onClick={onClickHandler}
    >
      <SettingIcon width={18} height={18}></SettingIcon>
    </div>
  );
}
