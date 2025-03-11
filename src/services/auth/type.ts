import { AxiosResponse } from 'axios';
import { ErrorResponse } from '../streamer/type';
import { accessToken } from 'chzzk/dist/api/chat';

export type RequestLoginWithOAuth2 = {
  code: string;
  state: string;
  channelId: string;
};

export type ResponseLoginWithOAuth2 =
  | (AxiosResponse & {
      accessToken: string;
    })
  | ErrorResponse;

export type RequestLogout = {
  accessToken: string;
};
