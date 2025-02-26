import CopyIcon from '@/app/assets/icons/CopyIcon';
import copyClipBoard from '@/lib/copyClipBoard';

type Props = {
  link: string;
};

export default function BtnCopyLink({ link }: Props) {
  const handleCopy = async () => {
    copyClipBoard(link);
  };
  return (
    <div
      className="flex cursor-pointer flex-row items-center border-r border-r-disable pr-2 text-primary"
      onClick={handleCopy}
    >
      <p className="mr-1 text-medium-large">시참 링크</p>
      <CopyIcon width={16} height={16} />
    </div>
  );
}
