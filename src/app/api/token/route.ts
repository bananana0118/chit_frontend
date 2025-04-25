import { NextResponse } from 'next/server';

export async function POST(): Promise<Response> {
  const response = NextResponse.json({ shouldRefresh: true }, { status: 200 });
  console.log('dasdasdasd');
  return response;
}
