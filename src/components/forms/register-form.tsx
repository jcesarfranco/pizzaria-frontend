'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { registerUser } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const router = useRouter();
  console.log(formAction);

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);

  return (
    <Card className="bg-app-card border-app-border w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
          Pasta
          <span className="text-brand-primary">Pizza</span>
        </CardTitle>
        <CardDescription>Faça seu cadastro para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nome
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              required
              minLength={3}
              className="text-white bg-app-card border border-app-border"
            ></Input>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              required
              className="text-white bg-app-card border border-app-border"
            ></Input>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Senha
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className="text-white bg-app-card border border-app-border"
            ></Input>
          </div>
          <Button
            type="submit"
            className="w-full bg-brand-primary text-white hover:bg-brand-primary mouse:hover:bg-brand-primary focus:bg-brand-primary cursor-pointer"
          >
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
          <p className="text-center text-sm text-white">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-brand-primary hover:underline">
              Faça o login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
