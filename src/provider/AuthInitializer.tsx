import { cookies } from 'next/headers';
import AuthInitializerClient from './AuthInitializerClient';

export default async function AuthInitializer() {
  const cookieStore = await cookies();
  const REFRESH_TOKEN = cookieStore.get('REFRESH_TOKEN')?.value;

  return (
    <>
      <AuthInitializerClient refreshToken={REFRESH_TOKEN ?? null} />
    </>
  );
}
