import { Orders } from '@/components/dashboard/orders';
import { getAuthToken } from '@/lib/auth';

export default async function Dashboard() {
  const token = await getAuthToken();

  return <Orders token={token!} />;
}
