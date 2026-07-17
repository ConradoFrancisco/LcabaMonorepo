'use client';

import { useParams } from 'next/navigation';
import ComponentCard from '@/components/common/ComponentCard';

export default function SectionEditPage() {
  return (
    <ComponentCard title="Secciones">
      <div className="p-4">
        <p>Aquí irá el formulario para editar la sección</p>
      </div>
    </ComponentCard>
  );
}
