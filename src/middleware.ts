import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
//
export function middleware() {
  // const cookie = request.cookies.get('name');
  // let hasCookie;
  // if (cookie?.value && cookie?.value.length >= 0) {
  //   hasCookie = true;

  //스트리머에서 sign-in요청시 리다이렉트를 스트리머 페이지로 보냅니다.

  // if (!request.nextUrl.pathname.startsWith('/streamer/sign-in')) {
  //   return NextResponse.redirect(new URL('/streamer', request.url));
  // }

  // //streamer 가 로그인 했을 경우
  // if (!request.nextUrl.pathname.startsWith('/viewer') && hasCookie) {
  //   console.log('hit');
  //   return NextResponse.redirect(new URL('/streamer/', request.url));
  // }

  return NextResponse.next();
}
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/',
// };
