import { ApiResponse } from '@/store/sessionStore';
import { ErrorResponse } from '../streamer/type';

export type GameCodeType = {
  gameParticipationCode: string;
};
export type GetContentsSessionGameCodeRequest = {
  sessionCode: string;
  accessToken: string;
};

export type GetContentsSessionGameCodeResponse =
  | ApiResponse<GameCodeType>
  | ErrorResponse;

export type DeleteContentSessionViewerLeaveRequest = {
  sessionCode: string;
  accessToken: string;
};

export type DeleteContentSessionViewerLeaveResponse =
  | ApiResponse<STATUS>
  | ErrorResponse;

export type STATUS = {
  status: string;
};

export type GetContentsSessionViewerSubscribeRequest = {
  sessionCode: string;
  accessToken: string;
  gameNickname: string;
};

export type GetContentsSessionViewerSubscribeResponse =
  | ApiResponse<GameCodeType>
  | ErrorResponse;
