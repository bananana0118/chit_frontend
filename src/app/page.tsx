import ChitLogo from './assets/logo/ChitLogo';
import NaverLogo from './assets/logo/logo_naver.svg';
import BtnWithChildren from './components/atoms/button/BtnWithChildren';
import CommonLayout from './components/layout/CommonLayout';
export default function Home() {
  return (
    <CommonLayout>
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <p className="mb-2 text-bold-middle text-white">
          더 쉽고 편한 시참 관리
        </p>
        <ChitLogo width={160} height={78}></ChitLogo>
      </section>
      <BtnWithChildren>
        <NaverLogo width={18} height={18}></NaverLogo>
        로그인하고 3초만에 시참 생성하기
      </BtnWithChildren>
    </CommonLayout>
  );
}
