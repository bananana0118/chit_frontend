import CustomError from './errors';
// 1. 에러 코드 상수 정의
export const SessionErrorCode = {
  LIVE_STREAM_INACTIVE: {
    //진행중인 라이브가 없을 경우
    name: 'LiveStreamInactiveError',
    status: 400,
    code: 301,
    message: '라이브 방송이 꺼져있습니다, 라이브 방송을 키고 다시 시도해주세요',
  },
  LIVE_SESSION_NOT_FOUND: {
    //진행중인 세션이 없을 경우
    name: 'LiveSessionNotFoundError',
    status: 400,
    code: 302,
    message: '라이브 방송이 꺼져있습니다, 라이브 방송을 키고 다시 시도해주세요',
  },
  INVALID_PARTICIPANT_COUNT: {
    name: 'InvalidParticipantCountError',
    status: 400,
    code: 303,
    message: '그룹당 최대 참가자 수는 1명 이상이어야 합니다. 현재 값: 0',
  },
  PARTICIPANT_NOT_FOUND: {
    name: 'participantNotFoundError',
    status: 400,
    code: 304,
    message: '해당 참여자가 존재하지 않습니다.',
  },
  LIVE_SESSION_EXISTS: {
    //진행중인 세션이 없을 경우
    name: 'LiveSessionNotFoundError',
    status: 400,
    code: 305,
    message: `이미 진행 중인 컨텐츠 세션이 존재합니다. 중복 생성을 할 수 없습니다. \n(진행중이던 세션은 잠시 후 자동적으로 종료됩니다. 잠시만 기다려 주세요)`,
  },
  SESSION_CODE_NOT_FOUND: {
    //세션코드가 세션스토리지에서 삭제 되었을 때
    name: 'SessionCodeNotFoundError',
    status: 400,
    code: 306,
    message: `세션코드를 찾을 수 없습니다. 시참방을 다시 생성해 주세요`,
  },
  SESSION_CLOSED: {
    name: 'SessionClosedError',
    status: 400,
    code: 307,
    message: `해당 세션이 이미 닫혔으니 세션을 다시 생성해주세요`,
  },
};

// viewer와 streamer Services에 사용됩니다.
class SessionError extends CustomError {
  constructor(errorCode = SessionErrorCode.LIVE_STREAM_INACTIVE) {
    super({ ...errorCode });
  }
}

export default SessionError;
