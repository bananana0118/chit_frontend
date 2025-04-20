import CommonLayout from '@/components/layout/CommonLayout';
import NavBar from '@/components/layout/NavBar';

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <CommonLayout>
      <NavBar></NavBar>
      {children}
    </CommonLayout>
  );
}
