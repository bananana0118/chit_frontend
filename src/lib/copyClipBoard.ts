import { toast } from 'react-toastify';

const copyClipBoard = async (str: string) => {
  try {
    if (!navigator.clipboard) {
      throw new Error('클립보드 API를 지원하지 않는 환경입니다.');
    }
    await navigator.clipboard.writeText(str);
    toast.success('클립보드에 복사되었습니다!');
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    toast.warn('클립보드 복사에 실패했습니다. 수동으로 복사해주세요.');
  }
};

export default copyClipBoard;
