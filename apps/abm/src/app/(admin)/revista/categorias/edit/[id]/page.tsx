import ComponentCard from '@/components/common/ComponentCard';
import CategoriasEditComponent from './components/CategoriasEditComponent';
import CategoriesServices from '../../../../../../../services/CategoriesServices';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await CategoriesServices.getCategoryById(id, 'magazine_categorias');
  console.log(response);
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {response === null ? (
          <div>No se encontró el registro</div>
        ) : (
          <CategoriasEditComponent response={response} />
        )}
      </ComponentCard>
    </div>
  );
}
