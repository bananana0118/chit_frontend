import ChitLogo from './assets/logo/ChitLogo';
import NaverLogo from './assets/logo/logo_naver.svg';
import StreamerLayoutWithButton from './components/layout/StreamerLayoutWithButton';
export default function Home() {
  return (
    <StreamerLayoutWithButton>
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <p className="mb-2 text-bold-middle text-white">
          더 쉽고 편한 시참 관리
        </p>
        <ChitLogo width={160} height={78}></ChitLogo>
      </section>
      <div className="button-container flex w-full flex-row items-center justify-center rounded-md bg-[#03C75A] p-[14px] text-white">
        <NaverLogo width={18} height={18}></NaverLogo>
        <div className="ml-3 text-medium-large">
          로그인하고 3초만에 시참 생성하기
        </div>
      </div>
    </StreamerLayoutWithButton>
  );
}
