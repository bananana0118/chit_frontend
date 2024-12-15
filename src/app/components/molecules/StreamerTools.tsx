import BtnCopyLink from '../atoms/button/BtnCopyLink';
import BtnOnOffParticiation from '../atoms/button/BtnOnOffParticiation';
import BtnSetting from '../atoms/button/BtnSetting';

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
