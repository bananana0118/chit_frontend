import guideText from '@/constants/guideText';

type Props = { isLive: 'OPEN' | 'CLOSE' };

export default function StreamerTextComment({ isLive }: Props) {
  return (
    <p className="text-bold-small">
      {isLive === 'OPEN' ? guideText.isLiveComment : guideText.isLiveCommentNo}
    </p>
  );
}
