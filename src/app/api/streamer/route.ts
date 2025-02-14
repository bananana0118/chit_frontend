import { getStreamerInfo } from '@/app/services/streamer/streamer';
import { NextResponse } from 'next/server';

// POST 요청 처리
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channelId } = body;
    console.log('post', channelId);
    if (!channelId) {
      return NextResponse.json(
        { error: 'channelId is required' },
        { status: 400 },
      );
    }

    const streamerInfo = await getStreamerInfo(channelId);

    if (streamerInfo) {
      return NextResponse.json({ streamerInfo }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Streamer is not live or HLS media not found' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
