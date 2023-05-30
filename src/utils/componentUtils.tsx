/* -------------------------------------------------------------------------- */
/*                               COMPONENT UTILS                              */
/* -------------------------------------------------------------------------- */
import clsx, { ClassValue } from 'clsx';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type StyledElements = {
  [key: string]: React.FC<React.HTMLAttributes<any>>;
};
type StyledElementOptions = {
  baseName?: string;
};
/* -------------------------------------------------------------------------- */

export function classNames<T>(...classes: HTMLAttributes<T>['className'][]) {
  return classes.filter(Boolean).join(' ');
}

export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const c = clsxm;

export function styledElements(o: StyledElements, options?: StyledElementOptions): StyledElements {
  return Object.fromEntries(
    Object.entries(o).map(([key, Elem]) => {
      const baseName = options?.baseName || 'styled';
      return [key, (props) => <Elem {...props} data-name={`${baseName}__${key}`} />];
    })
  );
}
