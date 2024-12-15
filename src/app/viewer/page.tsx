import Image from 'next/image';
import StreamerTextLive from '../components/atoms/text/StreamerTextLive';
import Live from '../components/atoms/label/Live';
import OFF from '../components/atoms/label/Off';
import BtnWithChildren from '@/app/components/atoms/button/BtnWithChildren';
import ViewerPageLayout from '../components/layout/ViewerPageLayout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ON = {
  isLive: 1,
  name: '따효니',
  category: '월드오브 워크래프트 : 내부전쟁',
  isCreate: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_OFF = {
  isLive: 0,
  name: '따효니',
  category: '',
  isCreate: false,
};
const DUMMY = DUMMY_OFF;

export default function Home() {
  if (!DUMMY.isCreate) {
    return (
      <ViewerPageLayout>
        <section className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="w-full">
            <div className="mb-12 flex w-full flex-col items-center justify-center">
              <p className="blcok text-bold-large">종료된 시참이에요</p>
              <p>다음 시참을 기대해주세요 :)</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <p className="text-medium-small text-alert">
                스트리머가 시참을 진행중이라면
              </p>
              <p className="text-medium-small text-alert">
                시참 링크를 요청해보세요!
              </p>
            </div>
          </div>
        </section>
      </ViewerPageLayout>
    );
  }

  return (
    <ViewerPageLayout>
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="mb-10 flex flex-col items-center justify-center gap-2">
          <StreamerTextLive isLive={DUMMY.isLive}></StreamerTextLive>
        </div>
        <Image
          src={'/tempImage.png'}
          width={128}
          height={128}
          alt="profile"
          className={`${DUMMY.isLive ? 'shadow-inset-primary' : 'shadow-inset-disable'} overflow-hidden rounded-full p-[3px]`}
        />

        <div className="mt-3 flex flex-row items-center justify-center">
          {DUMMY.isLive ? <Live /> : <OFF />}
          <div className="text-bold-large">{DUMMY.name}</div>
        </div>
      </section>
      <BtnWithChildren>로그인하고 3초만에 시참등록하기</BtnWithChildren>
    </ViewerPageLayout>
  );
}
