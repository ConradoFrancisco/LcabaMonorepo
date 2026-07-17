'use client';

import ComponentCard from '@/components/common/ComponentCard';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { auth } = useAuth();
  const name = auth.user?.name ?? '';
  const surname = auth.user?.surname ?? '';

  return (
    <ComponentCard title="Dashboard Lcaba Admin">
      <h1>{name ? `¡Bienvenido ${name} ${surname}!` : 'Cargando usuario...'}</h1>
    </ComponentCard>
  );
}
