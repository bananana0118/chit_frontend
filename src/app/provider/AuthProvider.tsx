'use server';
import { cookies } from 'next/headers';

type Props = { children: React.ReactNode };

export default async function AuthProvider({ children }: Props) {
  const cookieStore = await cookies();

  const name = cookieStore.get('name')?.value;

  console.log(name);
  return <>{children}</>;
}
