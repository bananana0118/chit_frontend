// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ON = {
  isLive: 1,
  name: '따효니',
  category: '월드오브 워크래프트 : 내부전쟁',
  isCreate: 'true',
};

export default function List() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <section id="controlBox" className="">
        <div>
          <div>
            시참<span>ON</span>
          </div>
          <div>시참링크 복사 | 설정</div>
        </div>
        <div>총 10명이 참여중이에요</div>
      </section>
      <section>
        <div id="listNav">
          <ul>
            <li>전체 인원</li>
            <li>고정 인원</li>
            <li>현재 인원</li>
          </ul>
          <div>다음파티호출 !</div>
        </div>
        <div id="list">
          <div id="partyblock">
            <div id="partyOrder">1</div>
            <div id="partyMember">
              <div>1번유저</div>
              <div>2번유저</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
