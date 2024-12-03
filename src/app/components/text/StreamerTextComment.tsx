import guideText from '@/app/constants/guideText';
type Props = { isLive: number };

export default function StreamerTextComment({ isLive }: Props) {
  return (
    <p className="text-bold-small">
      {isLive ? guideText.isLiveComment : guideText.isLiveCommentNo}
    </p>
  );
}
