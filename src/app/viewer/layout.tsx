import Image from 'next/image';
import ChitLogo from '../assets/logo/ChitLogo';
import CommonLayout from '../components/layout/CommonLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommonLayout>
      <nav className="mb-3 flex w-full flex-row items-center justify-between py-2">
        <ChitLogo width={44} height={22}></ChitLogo>
        <Image
          src={'/profile.png'}
          width={32}
          height={32}
          alt="profile"
        ></Image>
      </nav>
      {children}
    </CommonLayout>
  );
}
