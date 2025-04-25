import ChitLogo from '../../../public/assets/logo/ChitLogo';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import AuthInitializer from '@/provider/AuthInitializer';

const NavBar = () => {
  return (
    <nav className="relative mb-3 flex h-[32px] w-full flex-row items-center justify-between">
      <ChitLogo width={44} height={22} />
      <Suspense fallback={<Loading />}>
        <AuthInitializer />
      </Suspense>
    </nav>
  );
};

export default NavBar;
