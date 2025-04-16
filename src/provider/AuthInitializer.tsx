import { cookies } from 'next/headers';
import AuthInitializerClient from './AuthInitializerClient';

export default async function AuthInitializer() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  console.log('access?' + accessToken);
  return (
    <>
      <AuthInitializerClient accessToken={accessToken ?? null} />
    </>
  );
}
