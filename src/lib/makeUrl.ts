type makeUrlProps = {
  accessToken: string;
  isStreamer: boolean;
  sessionCode?: string;
  viewerNickname?: string;
  lastEventId?: string;
};

const makeUrl = ({ accessToken, isStreamer, sessionCode, viewerNickname }: makeUrlProps) => {
  if (viewerNickname)
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/subscribe?sessionCode=${sessionCode}&gameNickname=${viewerNickname}&accessToken=${accessToken}`;
  else if (isStreamer) {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/subscribe/?sessionCode=${sessionCode}&accessToken=${accessToken}`;
  } else {
  }
};

export default makeUrl;
