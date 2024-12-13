import Eyes from '@/app/assets/icons/Eyes';
import Minus from '@/app/assets/icons/Minus';
import Plus from '@/app/assets/icons/Plus';
import CategoryText from '@/app/components/atoms/text/CategoryText';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ON = {
  isLive: 1,
  name: '따효니',
  category: '월드오브 워크래프트 : 내부전쟁',
  isCreate: 'true',
};

const DUMMY = DUMMY_ON;

export default function Settings() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-1 flex-col items-start">
        <div className="mb-8">
          <CategoryText isMiddle={true} category={DUMMY.category} />
          <span className="mt-2 w-fit cursor-pointer border-b border-disable text-medium-small text-disable">
            카테고리 정보 다시 불러오기
          </span>
        </div>
        <div className="mb-11 w-full text-bold-small">
          <p className="pb-2">
            <span className="text-secondary">참여 코드</span>가 필요할까요?
          </p>
          <div className="flex w-full flex-row items-center justify-start rounded-md bg-white p-3 text-medium-large text-black">
            <input
              className="flex-1 outline-none"
              type="password"
              name="password"
              placeholder="참여코드가 있다면 입력해주세요"
            />
            <div className="relative bottom-0 right-0 top-0 cursor-pointer pl-2">
              <Eyes></Eyes>
            </div>
          </div>
        </div>

        <div>
          <p className="text-bold-small">한 파티에 몇 명이 필요한가요?</p>
          <p className="mb-5 mt-[6px] w-fit text-medium text-hint">
            다음 파티 호출 버튼을 클릭했을 때 설정할 인원 수 만큼 목록이
            돌아가요.
          </p>
          <div className="flex items-center">
            <button className="rounded-full bg-white p-1">
              <Minus width={16} height={16}></Minus>
            </button>
            <input
              name="memberCount"
              type="number"
              defaultValue={1}
              min={0}
              max={1000}
              className="mx-3 w-[102px] rounded px-3 py-2 text-center text-bold-middle text-black"
            ></input>
            <button className="rounded-full bg-white p-1">
              <Plus width={16} height={16}></Plus>
            </button>
          </div>
        </div>
      </section>
      <div
        className={`button-container flex w-full cursor-pointer flex-row items-center justify-center rounded-md bg-primary p-[14px] text-white`}
      >
        <div className={`ml-3 text-medium-large`}>시참 목록 완성 🎉 </div>
      </div>
    </div>
  );
}
