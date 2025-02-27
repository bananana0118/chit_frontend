import guideText from '@/constants/guideText';
import { StreamerStatusType } from '@/services/streamer/type';

type Props = {
  isLive: StreamerStatusType;
};

export default function StreamerTextLive({ isLive }: Props) {
  return (
    <p className="text-bold-middle text-primary">
      {isLive === 'OPEN' ? guideText.isLiveOn : guideText.isLiveOff}
    </p>
  );
}
