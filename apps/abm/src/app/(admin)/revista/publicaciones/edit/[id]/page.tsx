import ComponentCard from '@/components/common/ComponentCard';
import MagazineService from '../../../../../../../services/MagazineService';
import RevistaEditComponent from './components/RevistaEditComponent';
import PostService from '../../../../../../../services/PostService';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await PostService.getPostById(id, 'magazine_');
  console.log(response, 'response');
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {response === null ? (
          <div>No se encontró el registro</div>
        ) : (
          <RevistaEditComponent data={response} />
        )}
      </ComponentCard>
    </div>
  );
}
