import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/forms/login-form';
import { getUser } from '@/lib/auth';

export default async function Login() {
  const user = await getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="bg-appapp-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}
