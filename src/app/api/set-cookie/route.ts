import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Cookie set successfully' });
  response.cookies.set('name', 'kang', {
    httpOnly: true, // 보안을 위한 옵션
    path: '/',
    maxAge: 60 * 60 * 24, // 쿠키 만료 시간 (예: 1일)
  });

  return response;
}
