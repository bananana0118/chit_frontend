import { useEffect } from 'react';

type LogoutConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function WithdrawConfirmModal({ onConfirm, onCancel }: LogoutConfirmModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[320px] rounded-3xl border border-primary bg-background p-6 text-center text-white shadow-xl">
        <h2 className="text-medium-16 mb-2 font-semibold">
          정말 <span className="text-bold-middle text-primary">회원 탈퇴</span> 하시겠어요?
        </h2>
        <p className="text-medium-13 mb-4 text-sm text-hint">저장된 정보는 다시 복구할 수 없어요</p>

        <div className="flex justify-between gap-2 text-bold-small text-white">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-disable px-4 py-2 font-semibold transition-colors hover:opacity-80"
          >
            회원 탈퇴
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl bg-alert px-4 py-2 font-semibold transition-colors hover:opacity-80"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
