import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout menuItems={menuItems} breadcrumbTitle="¿Quiénes somos?">
      <section className="container py-5">
        <h1>¿Quiénes somos?</h1>
        <p>
          La Dirección General de Asuntos Culturales y Patrimoniales tiene como
          misión contribuir a la difusión del patrimonio histórico y cultural
          que alberga la Legislatura de la Ciudad Autónoma de Buenos Aires;
          planificando, diseñando y ejecutando acciones que promuevan la
          conservación, el acrecentamiento y la difusión del acervo patrimonial
          y cultural legislativo.
          <strong>Misión cultural, educativa y patrimonial:</strong>
          Fomentar las actividades culturales que promuevan la participación
          ampliada de los ciudadanos en distintas instancias artísticas y
          expresivas, fortaleciendo el acceso a actividades culturales
          consolidando diferentes espacios de expresión artística como lo son;
          la Sala de Exposiciones Manuel Belgrano y la Galería de los Atlantes,
          los diferentes ciclos culturales, el Ensamble y Coro de la
          Legislatura, el Concurso a la Producción Artística y el Concurso Yo te
          cuento Buenos Aires. Todas estas instancias promueven la accesibilidad
          a la cultura, entendiéndola como un derecho ciudadano a la identidad
          histórica y sociocultural compartida. En su acervo histórico y
          educativo la DGACyP cuenta con dos espacios de archivo histórico y
          cultural como son la Biblioteca Esteban Echeverría y la Hemeroteca
          José Hernández. Ambas dependencias tienen la tarea de compilar,
          difundir, conservar y propiciar el uso de libros y publicaciones
          periodísticas desarrollando acciones educativas, fomentando la
          formación legislativa tanto para los legisladores, como así también,
          para instituciones educativas de investigación, jurídicas y para la
          ciudadanía en general. La Legislatura de la Ciudad Autónoma de Buenos
          Aires fue declarada Monumento Histórico Nacional mediante el Decreto
          1495/2011, en carácter de su valor histórico y patrimonial para la
          memoria de todos los argentinos. Desde su función patrimonial, la
          Dirección General cuenta con un área de especializada en promover
          acciones destinadas a la conservación preventiva, la restauración y la
          capacitación interna de los trabajadores que permanecen en contacto
          diariamente con el patrimonio del Palacio, así como también el
          registro de los bienes pertenecientes a la institución.
        </p>
      </section>
    </Layout>
  );
}
