import CommonLayout from '@/components/layout/CommonLayout';

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return <CommonLayout>{children}</CommonLayout>;
}
