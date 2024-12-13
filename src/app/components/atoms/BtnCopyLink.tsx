import CopyIcon from '@/app/assets/icons/CopyIcon';

type Props = {
  link: string;
};

export default function BtnCopyLink({ link }: Props) {
  console.log(link);
  return (
    <div className="flex flex-row items-center border-r border-r-disable pr-2 text-primary">
      <p className="mr-1 text-medium-large">시참 링크</p>
      <CopyIcon width={16} height={16} />
    </div>
  );
}
