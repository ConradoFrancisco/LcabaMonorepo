import { Libre_Franklin } from "next/font/google";

// El layout raíz solo carga Libre Franklin 700/600; el diseño nuevo usa 400–800.
// Rubik (cuerpo) ya llega completo desde el layout raíz como --tc-body-font-family.
export const libreFranklin = Libre_Franklin({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--cl-font-display",
  display: "swap",
});
