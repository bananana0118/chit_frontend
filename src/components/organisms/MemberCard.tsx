import Cancel from '@/app/assets/icons/Cancel';
import Heart from '@/app/assets/icons/Heart';
import ZzzicIcon from '@/app/assets/icons/ZzzicIcon';

type Props = {
  zicName: string;
  gameNicname: string;
  isHeart: boolean;
};

export default function MemberCard({ zicName, gameNicname, isHeart }: Props) {
  return (
    <div
      id="member"
      className="member relative mb-1 flex-col rounded-md bg-background-sub p-[10px] last:mb-0"
    >
      <div className="mb-2 flex flex-row items-center justify-start">
        <ZzzicIcon width={20} height={20} />
        <div className="mx-2 flex-1 text-bold-small text-black">{zicName}</div>
        <div className="absolute right-[10px] top-[10px]">
          <Cancel width={12} height={12} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-start">
        <div className="h-5 w-5"></div>
        <div className="mx-2 flex-1 text-medium text-hint">{gameNicname}</div>
        <div className="absolute right-[10px]">
          <Heart width={12} height={12} fill={isHeart} />
        </div>
      </div>
    </div>
  );
}
