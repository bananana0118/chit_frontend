import { useEffect } from 'react';

type LogoutConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function LogoutConfirmModal({ onConfirm, onCancel }: LogoutConfirmModalProps) {
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
          <span className="text-bold-middle text-primary">로그아웃</span> 할까요?
        </h2>
        <p className="text-medium-13 mb-4 text-sm text-hint">
          로그아웃에 성공하면 창은 자동으로 닫혀요
        </p>

        <div className="flex justify-between gap-2 text-bold-small text-white">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-disable px-4 py-2 font-semibold transition-colors hover:opacity-80"
          >
            로그아웃
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
