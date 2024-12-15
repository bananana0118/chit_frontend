import guideText from '@/app/constants/guideText';

type Props = {
  isLive: number;
};

export default function StreamerTextLive({ isLive }: Props) {
  return (
    <p className="text-bold-middle text-primary">
      {isLive ? guideText.isLiveOn : guideText.isLiveOff}
    </p>
  );
}
