import { redirect } from 'next/navigation';
import { getUser, isAdmin } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const userAdmin = await isAdmin();

  if (!userAdmin) {
    redirect('/access-denied');
  }

  return <div>{children}</div>;
}
