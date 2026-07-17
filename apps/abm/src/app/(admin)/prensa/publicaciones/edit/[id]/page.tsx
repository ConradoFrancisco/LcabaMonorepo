import ComponentCard from '@/components/common/ComponentCard';
import PrensaEditComponent from './components/PrensaEditComponent';
import PostService from '../../../../../../../services/PostService';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await PostService.getPostById(id, ' ');
  console.log(response);
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {response === null ? (
          <div>No se encontró el registro</div>
        ) : (
          <PrensaEditComponent data={response} />
        )}
      </ComponentCard>
    </div>
  );
}
