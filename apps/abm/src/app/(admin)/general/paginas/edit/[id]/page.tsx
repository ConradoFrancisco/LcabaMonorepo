import ComponentCard from '@/components/common/ComponentCard';
import MagazineService from '../../../../../../../services/MagazineService';

import GeneralService from '../../../../../../../services/GeneralService';
import PageEditComponent from './components/PageEditComponent';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await GeneralService.getPageById(id);
  console.log(response);
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {response === null ? (
          <div>No se encontró el registro</div>
        ) : (
          <PageEditComponent data={response} />
        )}
      </ComponentCard>
    </div>
  );
}
