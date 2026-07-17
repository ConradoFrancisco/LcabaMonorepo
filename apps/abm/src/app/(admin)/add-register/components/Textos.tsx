// C:\Users\sacastro\Documents\proyects\Lcaba-Admin\src\app\(admin)\add-register\components\Textos.tsx
'use client';

import MyEditor from '@/components/my-components/MyEditor';
import { normalizarTitulo } from '@/utils/buildPublicUrl';
import * as Yup from 'yup';

export const textosSchema = Yup.object({
  title: Yup.string().min(3, 'El título debe tener al menos 3 caracteres'),
  subtitle: Yup.string().min(3, 'El subtítulo debe tener al menos 3 caracteres'),
  description: Yup.string().min(10, 'El cuerpo debe tener al menos 10 caracteres'),
});

type TextosProps = {
  title: string;
  subtitle: string;
  shortdesc: string;
  extradesc: string;
  url: string;
  url_ext: string;
  description: string;
  hasUrlExternal: boolean;
  /** Si es true, al cambiar el título se regenera la URL con el slug del título (posts/{titulo}.html). */
  generaUrlDesdeTitulo?: boolean;
  setTextos: (newTextos: {
    title: string;
    subtitle: string;
    shortdesc: string;
    extradesc: string;
    url: string;
    url_ext: string;
    description: string;
  }) => void;
};

export default function Textos({
  title,
  subtitle,
  shortdesc,
  extradesc,
  url,
  url_ext,
  description,
  hasUrlExternal,
  generaUrlDesdeTitulo = false,
  setTextos,
}: TextosProps) {
  const handleTitleChange = (value: string) => {
    setTextos({
      title: value,
      subtitle,
      shortdesc,
      extradesc,
      url: generaUrlDesdeTitulo ? `posts/${normalizarTitulo(value)}.html` : url,
      url_ext,
      description,
    });
  };

  return (
    <div className="card-surface grid gap-4 rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
      <div>
        <label className="form-label">Título</label>
        <input
          value={title ?? ''}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="form-input px-4 text-sm"
        />
      </div>

      <div>
        <label className="form-label">Subtítulo</label>
        <input
          value={subtitle ?? ''}
          onChange={(e) =>
            setTextos({
              title,
              subtitle: e.target.value,
              shortdesc,
              extradesc,
              url,
              url_ext,
              description,
            })
          }
          className="form-input px-4 text-sm"
        />
      </div>

      <div>
        <label className="form-label">Resumen</label>
        <div className="editor-surface p-2">
          <MyEditor
            value={shortdesc}
            onChange={(val) =>
              setTextos({ title, subtitle, shortdesc: val, extradesc, url, url_ext, description })
            }
          />
        </div>
      </div>

      <div>
        <label className="form-label">Cuerpo</label>
        <div className="editor-surface p-2">
          <MyEditor
            value={description}
            onChange={(val) =>
              setTextos({ title, subtitle, shortdesc, extradesc, url, url_ext, description: val })
            }
          />
        </div>
      </div>

      <div>
        <label className="form-label">Descripción extra</label>
        <div className="editor-surface p-2">
          <MyEditor
            value={extradesc}
            onChange={(val) =>
              setTextos({ title, subtitle, shortdesc, extradesc: val, url, url_ext, description })
            }
          />
        </div>
      </div>

      <div>
        <label className="form-label">URL</label>
        <input
          value={url ?? ''}
          onChange={(e) =>
            setTextos({
              title,
              subtitle,
              shortdesc,
              extradesc,
              url: e.target.value,
              url_ext,
              description,
            })
          }
          className="form-input px-4 text-sm"
        />
      </div>

      {hasUrlExternal && (
        <div>
          <label className="form-label">URL Externa</label>
          <input
            value={url_ext ?? ''}
            onChange={(e) =>
              setTextos({
                title,
                subtitle,
                shortdesc,
                extradesc,
                url,
                url_ext: e.target.value,
                description,
              })
            }
            className="form-input px-4 text-sm"
          />
        </div>
      )}
    </div>
  );
}
