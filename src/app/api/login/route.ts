import { NextRequest, NextResponse } from 'next/server';
import { AUTH_URLS } from '@/constants/urls';

export const POST = async (req: NextRequest): Promise<Response> => {
  const { code, state } = await req.json();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + AUTH_URLS.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, state }),
  });

  const data = await res.json();
  const response = NextResponse.json({ accessToken: data.data }, { status: 200 });

  // ✅ Secure + SameSite 쿠키설정
  response.cookies.set('accessToken', data.data, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
};

export const GET = async () => {
  const response = new NextResponse(null, { status: 200 });
  response.cookies.set('accessToken', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });
  return response;
};
