type makeUrlProps = {
  accessToken: string;
  sessionCode?: string;
  viewerNickname?: string;
  lastEventId?: string;
};

const makeUrl = ({ accessToken, sessionCode, viewerNickname }: makeUrlProps) => {
  if (viewerNickname)
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/subscribe?sessionCode=${sessionCode}&gameNickname=${viewerNickname}&accessToken=${accessToken}`;
  else {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/subscribe?sessionCode=${sessionCode}&accessToken=${accessToken}`;
  }
};

export default makeUrl;
