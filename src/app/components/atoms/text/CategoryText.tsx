import GameIcon from '@/app/assets/icons/GameIcon';
import guideText from '@/app/constants/guideText';
type Props = {
  category: string;
  isMiddle?: boolean;
};

export default function CategoryText({ category, isMiddle }: Props) {
  return (
    <div
      className={`flex flex-row items-center justify-center ${category ? 'text-primary' : 'text-disable'}`}
    >
      <GameIcon width={20} height={18} aria-label="Game Icon"></GameIcon>
      <div className={`${isMiddle ? 'text-bold-middle' : 'text-bold-small'}`}>
        {category || guideText.hasCategoryNo}
      </div>
    </div>
  );
}
