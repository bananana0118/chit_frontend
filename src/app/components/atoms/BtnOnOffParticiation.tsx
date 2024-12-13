type Props = {
  isOn: boolean;
};

export default function BtnOnOffParticiation({ isOn }: Props) {
  return (
    <div className="w-fit rounded-md bg-primary p-2 text-bold-small">
      시참 <span className="text-alert">{isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}
