// -------------------------------------------------------------------------- //
//-                                STYLE UTILS                               -//
// -------------------------------------------------------------------------- //

// ---------------------------------- Types --------------------------------- //
type NestedObject = {
  [key: string]: string | NestedObject;
};
/* -------------------------------------------------------------------------- */

// --------------------------------- Exports -------------------------------- //

export function cssMapExportToObject(cssModule: any) {
  return Object.keys(cssModule).reduce((result, key) => {
    if (!key.includes('-')) return result;
    const keys = key.split('-');
    let current = result;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = cssModule[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
    return result;
  }, {} as any);
}

export const themeColorsToTailwind = objectToCssVariablePath;

// --------------------------------- Helpers -------------------------------- //
function objectToCssVariablePath(obj: NestedObject, path = ''): NestedObject {
  let result: NestedObject = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = objectToCssVariablePath(obj[key] as NestedObject, `${path}-${key}`);
      } else {
        let variablePath = `${path}-${key}`.replace(/^-/, '');
        result[key] = `var(--${variablePath})`;
      }
    }
  }

  return result;
}
