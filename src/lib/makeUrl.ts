type makeUrlProps = {
  accessToken: string;
  isStreamer: boolean;
  sessionCode?: string;
  viewerNickname?: string;
  lastEventId?: string;
};

const makeUrl = ({
  accessToken,
  isStreamer,
  sessionCode,
  viewerNickname,
  lastEventId,
}: makeUrlProps) => {
  if (isStreamer)
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/streamer/init?accessToken=${accessToken}`;
  else if (isStreamer && lastEventId) {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/streamer/init?accessToken=${accessToken}&lastEventId=${lastEventId}`;
  } else {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/viewer/subscribe?sessionCode=${sessionCode}&gameNickname=${viewerNickname}&accessToken=${accessToken}`;
  }
};

export default makeUrl;
