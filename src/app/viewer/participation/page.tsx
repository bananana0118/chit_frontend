import BtnWithChildren from '@/app/components/atoms/button/BtnWithChildren';
import Input from '@/app/components/atoms/input/Input';
import CategoryText from '@/app/components/atoms/text/CategoryText';
import HintText from '@/app/components/atoms/text/HintText';
import ViewerPageLayout from '@/app/components/layout/ViewerPageLayout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ON = {
  isLive: 1,
  name: '따효니',
  category: '월드오브 워크래프트 : 내부전쟁',
  isCreate: 'true',
};

const DUMMY = DUMMY_ON;

export default function Settings() {
  const inputText = '';

  return (
    <ViewerPageLayout>
      <section className="flex w-full flex-1 flex-col items-start">
        <div className="mb-8">
          <CategoryText isMiddle={true} category={DUMMY.category} />
          <div className="text-bold-small">처음 참여하시는 게임이네요!</div>
        </div>
        <div className="mb-5 w-full">
          <div className="mb-12 w-full text-bold-middle">
            <p>
              <span className="text-secondary">게임 닉네임</span>을 알려주시면
            </p>
            <p>스트리머에게 전달해드릴게요:)</p>
            <HintText>
              닉네임은 스트리머에게만 보여지며, 다른 목적으로 활용하지 않아요
            </HintText>
          </div>
          <div className="mb-[6px] flex w-full flex-row items-center justify-start rounded-md bg-white p-3 text-medium-large text-black">
            <Input
              type="text"
              name="gameNickname"
              placeholder="여기에 게임닉네임을 입력해 주세요"
            />
          </div>
          <HintText>* 등록한 닉네임은 나중에 수정할 수 있어요</HintText>
        </div>
      </section>
      {/* todo : state에 따라 닉네임 상태 분리하기  */}
      <BtnWithChildren type={inputText.length > 0 ? 'default' : 'disable'}>
        닉네임 다 입력했어요
      </BtnWithChildren>
    </ViewerPageLayout>
  );
}
