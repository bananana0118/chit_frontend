'use client';
import StreamerTools from '@/app/components/molecules/StreamerTools';
import MemberCard from '@/app/components/organisms/MemberCard';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ON = {
  isLive: 1,
  name: '따효니',
  category: '월드오브 워크래프트 : 내부전쟁',
  isCreate: 'true',
};

export default function List() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <section id="controlBox" className="w-full">
        <StreamerTools />
        <p className="mb-5 mt-4 text-bold-middle">
          총 <span className="text-primary">10명</span>이 참여중이에요
        </p>
      </section>
      <section className="w-full flex-1">
        <div id="listNav " className="mb-3 flex flex-row justify-between">
          <ul className="flex flex-row items-center text-medium-large">
            <li className="menutab mr-3 last:mr-0">전체 인원</li>
            <li className="menutab mr-3 last:mr-0">고정 인원</li>
            <li className="menutab mr-3 last:mr-0">현재 인원</li>
          </ul>
          <div className="rounded-md bg-background-sub p-2 text-semi-bold text-secondary">
            다음 파티 호출 🔈
          </div>
        </div>
        <div id="list" className="flex w-full flex-1">
          <div id="partyblock" className="flex h-full w-full flex-row">
            <div
              id="partyOrder"
              className="mr-[6px] flex w-7 items-center justify-center rounded-md bg-background-sub text-bold-small text-secondary"
            >
              1
            </div>
            <div id="partyMembers" className="flex-1">
              <MemberCard
                zicName={'치지직 닉네임1'}
                gameNicname="게임 닉네임"
                isHeart={true}
              />
              <MemberCard
                zicName={'치지직 닉네임2'}
                gameNicname="게임 닉네임"
                isHeart={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
