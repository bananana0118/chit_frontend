import Image from 'next/image';
import CategoryText from '../components/atoms/text/CategoryText';
import StreamerTextLive from '../components/atoms/text/StreamerTextLive';
import StreamerTextComment from '../components/atoms/text/StreamerTextComment';
import Live from '../components/atoms/label/Live';
import OFF from '../components/atoms/label/Off';
import RefreshText from '../components/atoms/text/RefreshText';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ON = {
  isLive: 1,
  name: '따효니',
  category: '월드오브 워크래프트 : 내부전쟁',
  isCreate: 'true',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_OFF = {
  isLive: 0,
  name: '따효니',
  category: '',
  isCreate: 'false',
};
const DUMMY = DUMMY_OFF;

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="mb-10 flex flex-col items-center justify-center gap-2">
          <StreamerTextLive isLive={DUMMY.isLive}></StreamerTextLive>
          <StreamerTextComment isLive={DUMMY.isLive}></StreamerTextComment>
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
        {DUMMY.isLive ? (
          <CategoryText category={DUMMY.category}></CategoryText>
        ) : (
          <RefreshText />
        )}
      </section>
      <div
        className={`button-container flex w-full flex-row items-center justify-center rounded-md ${DUMMY.isLive ? 'cursor-pointer bg-primary' : 'cursor-default bg-disable'} p-[14px] text-white`}
      >
        <div className={`ml-3 text-medium-large`}>시참 등록 생성할래요</div>
      </div>
    </div>
  );
}
