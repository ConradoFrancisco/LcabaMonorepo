import ComponentCard from '@/components/common/ComponentCard';

import SectionEditComponent from './components/SectionEditComponent';
import GeneralService from '../../../../../../../services/GeneralService';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await GeneralService.getSectionById(id);

  console.log(response)
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {response === null ? (
          <div>No se encontró el registro</div>
        ) : (
          <SectionEditComponent data={response} />
        )}
      </ComponentCard>
    </div>
  );
}
