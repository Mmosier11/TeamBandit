// -------------------------------------------------------------------------- //
//-                               SCSS IMPORTS                               -//
// -------------------------------------------------------------------------- //
import { cssMapExportToObject, themeColorsToTailwind } from '../../utils/styleUtils';
import SCSSExports from '../exports/export.module.scss';
/* -------------------------------------------------------------------------- */
const scssExports = cssMapExportToObject(SCSSExports);

// --------------------------------- Exports -------------------------------- //
const LSA_Colors = scssExports?.color || {};

const LSA_Tailwind_Colors = themeColorsToTailwind(LSA_Colors);

const LSA_PaletteNames = [
  'primary',
  'secondary',
  'accent',
  'base',
  'background',
  'paper',
  'info',
  'success',
  'warning',
  'error',
  'text',
] as const;

export { LSA_Colors, LSA_Tailwind_Colors, LSA_PaletteNames };
