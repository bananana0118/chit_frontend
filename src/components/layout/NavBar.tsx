'use client';

import ChitLogo from '@/app/assets/logo/ChitLogo';
import Image from 'next/image';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';
import LogoutConfirmModal from '../molecules/LogoutConfirmModal';
import { STORAGE_KEYS } from '@/constants/urls';
import useParamsParser from '@/hooks/useParamsParser';
import { useRouter } from 'next/navigation';
import { useSSEStore } from '@/store/sseStore';
import { logout } from '@/services/auth/auth';
import useContentsSessionStore from '@/store/sessionStore';
const NavBar = () => {
  const { isLogin, role, setLogin, accessToken, setAccessToken } = useAuthStore((state) => state);
  const { reset: SSEStoreReset } = useSSEStore();
  const { reset: ContentsSessionReset } = useContentsSessionStore();
  const [isOpen, setIsOpen] = useState(false);
  const { channelId, sessionCode } = useParamsParser();
  const router = useRouter();
  console.log(isLogin);

  const handleLogout = async () => {
    const userRole = role;
    setIsOpen(false);
    setLogin(false);

    setAccessToken(null);
    SSEStoreReset();
    ContentsSessionReset();
    localStorage.removeItem(STORAGE_KEYS.AuthStorageKey);
    localStorage.removeItem(STORAGE_KEYS.SSEStorageKey);
    localStorage.removeItem(STORAGE_KEYS.SessionStorageKey);

    if (userRole === 'VIEWER' && accessToken) {
      await logout({ accessToken });
      router.replace(`/${channelId}/${sessionCode}`);
    } else if (accessToken) {
      const response = await logout({ accessToken });
      if (response.status === 200) router.push(`/`);
    }
  };

  const onClickLogoutModal = () => {
    setIsOpen(true);
  };

  if (!isLogin) {
    return (
      <nav className="mb-3 flex min-h-[32px] w-full flex-row items-center justify-between">
        <ChitLogo width={44} height={22}></ChitLogo>
      </nav>
    );
  }

  return (
    <nav className="relative mb-3 flex h-[32px] w-full flex-row items-center justify-between">
      <ChitLogo width={44} height={22}></ChitLogo>
      <div className="group relative z-10 flex h-[52px] w-[52px] items-center justify-center">
        <Image
          src={'/profile.png'}
          className="relative z-20 rounded-full transition-shadow duration-200 ease-out group-hover:ring-2 group-hover:ring-primary"
          width={32}
          height={32}
          alt="profile"
        />

        <div className="pointer-events-none absolute right-0 top-[52px] z-20 w-24 flex-col overflow-hidden rounded-2xl border-2 border-primary bg-black text-medium-13 text-white opacity-0 transition-transform duration-200 ease-out will-change-transform group-hover:pointer-events-auto group-hover:scale-[1.02] group-hover:opacity-100">
          {/* <div className="cursor-pointer border-b border-primary px-4 py-2 text-center hover:bg-primary/30">
            마이페이지
          </div> */}
          <div
            onClick={onClickLogoutModal}
            className="cursor-pointer px-4 py-2 text-center hover:bg-primary/30"
          >
            로그아웃
          </div>
        </div>
      </div>
      {isOpen && <LogoutConfirmModal onConfirm={handleLogout} onCancel={() => setIsOpen(false)} />}
    </nav>
  );
};

export default NavBar;
