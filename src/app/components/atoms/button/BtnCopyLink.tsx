import CopyIcon from '@/app/assets/icons/CopyIcon';
import { toast } from 'react-toastify';

type Props = {
  link: string;
};

export default function BtnCopyLink({ link }: Props) {
  const handleCopy = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('클립보드 API를 지원하지 않는 환경입니다.');
      }
      await navigator.clipboard.writeText(link);
      toast.success('클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      toast.warn('클립보드 복사에 실패했습니다. 수동으로 복사해주세요.');
    }
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
