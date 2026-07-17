'use client';
import { useEditor, EditorContent, Mark } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { useEffect, useState } from 'react';

// Extensión personalizada para fontSize
const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ''),
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element) => {
          if (typeof element === 'string') return false;
          const hasFontSize = element.style.fontSize;
          return hasFontSize ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { fontSize });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

interface MyEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MyEditor: React.FC<MyEditorProps> = ({
  value,
  onChange,
  placeholder = 'Escribe algo...',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      FontSize,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
        placeholder: placeholder,
      },
    },
    immediatelyRender: false,
  });

  const fontSizes = [
    { label: 'XS', value: '12px', title: 'Extra pequeño' },
    { label: 'S', value: '14px', title: 'Pequeño' },
    { label: 'M', value: '16px', title: 'Mediano' },
    { label: 'L', value: '18px', title: 'Grande' },
    { label: 'XL', value: '20px', title: 'Extra grande' },
    { label: 'XXL', value: '24px', title: 'Muy grande' },
  ];

  const fontFamilies = [
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Times', value: 'Times New Roman, serif' },
    { label: 'Courier', value: 'Courier New, monospace' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  ];

  const setFontSize = (size: string) => {
    editor?.chain().focus().setFontSize(size).run();
  };

  const removeFontSize = () => {
    editor?.chain().focus().unsetFontSize().run();
  };

  const setFontFamily = (font: string) => {
    editor?.chain().focus().setMark('textStyle', { fontFamily: font }).run();
  };

  const removeFontFamily = () => {
    editor?.chain().focus().unsetMark('textStyle').run();
  };

  const addImage = () => {
    const url = window.prompt('URL de la imagen:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('URL:');
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().unsetLink().run();
      return;
    }
    editor?.chain().focus().setLink({ href: url }).run();
  };

  if (!mounted || !editor) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-gray-300 bg-gray-50">
        <p>Cargando editor...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      {/* Toolbar Mejorado */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-300 bg-gray-50 p-2">
        {/* Selector de Tamaño de Fuente */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-gray-600">Tamaño:</span>
          <select
            onChange={(e) => {
              if (e.target.value === '') {
                removeFontSize();
              } else {
                setFontSize(e.target.value);
              }
            }}
            className="rounded border bg-white p-1 text-sm"
            title="Tamaño de fuente"
            value={editor.getAttributes('fontSize').fontSize || ''}
          >
            <option value="">Predeterminado</option>
            {fontSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label} ({size.value})
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Familia de Fuente */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-gray-600">Fuente:</span>
          <select
            onChange={(e) => {
              if (e.target.value === '') {
                removeFontFamily();
              } else {
                setFontFamily(e.target.value);
              }
            }}
            className="rounded border bg-white p-1 text-sm"
            title="Familia de fuente"
            value={editor.getAttributes('textStyle').fontFamily || ''}
          >
            <option value="">Predeterminado</option>
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Formato de Texto Básico */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-2 ${
            editor.isActive('bold') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          title="Negrita"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-2 ${
            editor.isActive('italic') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          title="Itálica"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded p-2 ${
            editor.isActive('strike') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          title="Tachado"
        >
          <s>S</s>
        </button>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Lists - CORREGIDO */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-2 ${
            editor.isActive('bulletList') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          title="Lista con viñetas"
        >
          <span className="text-lg">•</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-2 ${
            editor.isActive('orderedList') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          title="Lista numerada"
        >
          1.
        </button>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Alineación */}
        {/* <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
          title="Alinear izquierda"
        >
          ←
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
          title="Centrar"
        >
          ↔
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
          title="Alinear derecha"
        >
          →
        </button> */}

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Links and images */}
        <button
          onClick={setLink}
          className={`rounded p-2 ${
            editor.isActive('link') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          title="Enlace"
        >
          🔗
        </button>
        <button onClick={addImage} className="rounded p-2 hover:bg-gray-100" title="Imagen">
          🖼️
        </button>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>

        {/* Botón para limpiar formato */}
        <button
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
          className="rounded p-2 text-red-600 hover:bg-gray-100"
          title="Limpiar todo el formato"
        >
          🧹
        </button>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} className="min-h-[300px] p-4" />

      {/* Info de formato actual */}
      <div className="border-t border-gray-300 bg-gray-50 p-2 text-xs text-gray-600">
        <div>
          <strong>Tamaño:</strong> {editor.getAttributes('fontSize').fontSize || 'Predeterminado'}
        </div>
        <div>
          <strong>Fuente:</strong>{' '}
          {editor.getAttributes('textStyle').fontFamily || 'Predeterminada'}
        </div>
        <div>
          <strong>Formato:</strong> {editor.isActive('bold') && 'Negrita '}
          {editor.isActive('italic') && 'Itálica '}
          {editor.isActive('strike') && 'Tachado '}
          {editor.isActive('bulletList') && 'Lista viñetas '}
          {editor.isActive('orderedList') && 'Lista numerada '}
          {!editor.isActive('bold') &&
            !editor.isActive('italic') &&
            !editor.isActive('strike') &&
            !editor.isActive('bulletList') &&
            !editor.isActive('orderedList') &&
            'Normal'}
        </div>
      </div>
    </div>
  );
};

export default MyEditor;
