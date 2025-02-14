'use client';

import ChitLogo from '@/app/assets/logo/ChitLogo';
import Image from 'next/image';
import useAuthStore from '@/app/store/store';

const NavBar = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) {
    return (
      <nav className="mb-3 flex w-full flex-row items-center justify-between py-2">
        <ChitLogo width={44} height={22}></ChitLogo>
        <div className="h-8 w-8" />
      </nav>
    );
  }

  return (
    <nav className="mb-3 flex w-full flex-row items-center justify-between py-2">
      <ChitLogo width={44} height={22}></ChitLogo>
      <Image src={'/profile.png'} width={32} height={32} alt="profile"></Image>
    </nav>
  );
};

export default NavBar;
