import GameIcon from '../../../../public/assets/icons/GameIcon';
import guideText from '@/constants/guideText';
type Props = {
  category: string;
  isMiddle?: boolean;
  isLeft?: boolean;
};

export default function CategoryText({ category, isMiddle, isLeft }: Props) {
  return (
    <div
      className={`flex flex-row items-center ${isLeft ? 'justify-start' : 'justify-center'} pb-2 ${category ? 'text-primary' : 'text-disable'}`}
    >
      <GameIcon width={20} height={18} aria-label="Game Icon"></GameIcon>
      <div className={`${isMiddle ? 'text-bold-middle' : 'text-bold-small'}`}>
        {category || guideText.hasCategoryNo}
      </div>
    </div>
  );
}
