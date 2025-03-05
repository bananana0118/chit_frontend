import { ParticipantResponseType } from '@/store/sseStore';

const DummyData = {
  channelId: 'd7ddd7585a271e55159ae47c0ce9a9dd',
};

export const generagtionViewers = (
  page: number,
  limit: number = 5,
): ParticipantResponseType[] => {
  const start = (page - 1) * limit;
  return Array.from({ length: limit }, (_, i) => ({
    viewerId: start + i + 1,
    round: Math.floor(i % 2) + 2,
    gameNickname: `Viewer ${start + i + 1}`,
    chzzkNickname: `치지직유저 ${start + i + 1}`,
    fixedPick: false,
    order: start + i + 1,
  }));
};

export default DummyData;
