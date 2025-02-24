import { AxiosResponse } from 'axios';

export type RequestLoginWithOAuth2 = {
  code: string;
  state: string;
  channelId: string;
};

export type ResponseLoginWithOAuth2 = AxiosResponse & {
  accessToken: string;
};
