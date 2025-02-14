type makeUrlProps = {
  accessToken: string;
  isStreamer: boolean;
  sessionCode?: string;
  viewerGameNickname?: string;
};

const makeUrl = ({
  accessToken,
  isStreamer,
  sessionCode,
  viewerGameNickname,
}: makeUrlProps) => {
  if (isStreamer)
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/streamer/init?accessToken=${accessToken}`;
  else {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/session/viewer/subscribe?sessionCode=${sessionCode}&gameNickname=${viewerGameNickname}&accessToken=${accessToken}`;
  }
};

export default makeUrl;
