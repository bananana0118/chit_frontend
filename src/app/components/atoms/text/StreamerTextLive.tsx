import guideText from '@/app/constants/guideText';
import { StreamerStatusType } from '@/app/services/streamer/streamer';

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
