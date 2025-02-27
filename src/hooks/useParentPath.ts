import { usePathname } from 'next/navigation';

const useParentPath = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  return '/' + pathSegments.slice(0, -1).join('/');
};

export default useParentPath;
