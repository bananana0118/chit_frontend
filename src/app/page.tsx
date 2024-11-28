import ChitLogo from './assets/logo/ChitLogo';
import NaverLogo from './assets/logo/logo_naver.svg';
import StreamerLayoutWithButton from './components/layout/StreamerLayoutWithButton';
export default function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <StreamerLayoutWithButton>
        <section className="flex w-full flex-1 flex-col items-center justify-center">
          <p className="mb-2 text-bold-middle text-white">
            더 쉽고 편한 시참 관리
          </p>
          <ChitLogo width={160} height={78}></ChitLogo>
        </section>
        <div className="w-full rounded-md bg-[#03C75A] px-3 py-2 text-white">
          <NaverLogo width={24} height={24}></NaverLogo>
          로그인하고 3초만에 시참 생성하기
        </div>
      </StreamerLayoutWithButton>
    </div>
  );
}
