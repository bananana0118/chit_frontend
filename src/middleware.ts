import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
//
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('REFRESH_TOKEN');
  const role = request.cookies.get('CH_ROLE');
  let hasCookie = false;
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);

  if (cookie?.value && cookie?.value.length >= 0) {
    hasCookie = true;
  }

  // 로그인 페이지로 보내기 전에 최초 요청을 통해 쿠키를 설정해 Role을 결정합니다.
  if (!role?.value || !hasCookie) {
    console.debug('쿠키 또는 역할 값이 없어 리다이렉트를 시작합니다.');
    const redirectUrl = request.nextUrl.clone();
    console.debug('redirectUrl', redirectUrl.pathname);
    let responseWithCookie = NextResponse.redirect(redirectUrl);
    if (!hasCookie && redirectUrl.pathname !== '/login' && !segments.includes('viewer')) {
      if (segments.includes('streamer')) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/login';
        responseWithCookie = NextResponse.redirect(redirectUrl);

        return responseWithCookie;
      } else {
        return NextResponse.next();
      }
    } else if (!role) {
      if (segments.includes('viewer')) {
        responseWithCookie.cookies.set('CH_ROLE', 'VIEWER', {
          path: '/',
          maxAge: 60 * 60 * 24, // 1일
          secure: false, // ⚠️ 프로덕션에서는 반드시 true
          httpOnly: false,
          sameSite: 'lax',
        });
      } else {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/login';
        responseWithCookie = NextResponse.redirect(redirectUrl);
        responseWithCookie.cookies.set('CH_ROLE', 'STREAMER', {
          path: '/',
          maxAge: 60 * 60 * 24, // 1일
          secure: false, // ⚠️ 프로덕션에서는 반드시 true
          httpOnly: false,
          sameSite: 'lax',
        });
        console.debug('리다이렉트 URL 설정:', redirectUrl.pathname);
      }
      return responseWithCookie;
    }
  } else {
    const responseWithCookie = NextResponse.next();

    if (segments.includes('streamer')) {
      if (role && role.value !== 'STREAMER') {
        responseWithCookie.cookies.set('CH_ROLE', 'STREAMER', {
          path: '/',
          maxAge: 60 * 60 * 24, // 1일
          secure: false, // ⚠️ 프로덕션에서는 반드시 true
          httpOnly: false,
          sameSite: 'lax',
        });
      }
    } else if (segments.includes('viewer')) {
      if (role && role.value !== 'VIEWER') {
        responseWithCookie.cookies.set('CH_ROLE', 'VIEWER', {
          path: '/',
          maxAge: 60 * 60 * 24, // 1일
          secure: false, // ⚠️ 프로덕션에서는 반드시 true
          httpOnly: false,
          sameSite: 'lax',
        });
      }
    }
    return responseWithCookie;
  }
  if (request.nextUrl.pathname.includes('login') || request.nextUrl.pathname.endsWith('callback')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/streamer/:path*', '/viewer/:channelId/:sessionCode/:path*', '/login'],
};
