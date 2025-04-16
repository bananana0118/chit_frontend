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

  // ✅ HttpOnly + Secure + SameSite 쿠키설정
  response.cookies.set('accessToken', data.data, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
};
