import BtnCopyLink from '../atoms/BtnCopyLink';
import BtnOnOffParticiation from '../atoms/BtnOnOffParticiation';
import BtnSetting from '../atoms/BtnSetting';

//추후 데이터 넘기기

export default function StreamerTools() {
  return (
    <div className="flex justify-between">
      <BtnOnOffParticiation isOn={true} />
      <div className="flex flex-row rounded-md bg-background-sub p-2">
        <BtnCopyLink link="www.naver.com" />
        <BtnSetting />
      </div>
    </div>
  );
}
