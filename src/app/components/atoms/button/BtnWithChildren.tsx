'use client';

type BtnWithTextType = 'alert' | 'disable' | 'default';

type Props = {
  children: React.ReactNode;
  type?: BtnWithTextType;
};

export default function BtnWithChildren({ children, type = 'default' }: Props) {
  const buttonStyles = {
    alert: 'alert', // 경고 버튼
    disable: 'disable', // 비활성화 버튼
    default: 'primary', // 기본 버튼
  };

  const setCookie = async () => {
    const res = await fetch('api/set-cookie');
    alert('로그인 되었습니다.');
    console.log(res);
  };

  return (
    <div
      onClick={setCookie}
      className={`button-container flex w-full flex-row items-center justify-center rounded-md text-medium-large bg-${buttonStyles[type]} p-[14px] text-white`}
    >
      {children}
    </div>
  );
}
