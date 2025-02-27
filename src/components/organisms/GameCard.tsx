import EditIcon from '@/app/assets/icons/EditIcon';

type Props = {
  category: string;
  gameNicname: string;
};

export default function GameCard({ category, gameNicname }: Props) {
  return (
    <div
      id="gameCard"
      className="gameCard mb-[6px] flex w-full flex-row items-center justify-between rounded-md bg-background-sub px-4 py-3 last:mb-0"
    >
      <div className="flex flex-col">
        <div className="text-bold-small text-black">{category}</div>
        <div className="text-medium-small text-hint">{gameNicname}</div>
      </div>
      <EditIcon width={14} height={14}></EditIcon>
    </div>
  );
}
