/* -------------------------------------------------------------------------- */
/*                                STRING UTILS                                */
/* -------------------------------------------------------------------------- */

import { limitValue } from './logic';
/* -------------------------------------------------------------------------- */

export const titleCase = (str: string) =>
  str.replace(/\w\S*/g, ([first, ...rest]: any) => first?.toUpperCase() + rest.join(''));

export function generateUUID(prefix: string = '') {
  return `${prefix}_${Math.random().toString(36).substring(2, 6)}`;
}

export function fillTo(str: string, length: number, fillChar: string = ' ') {
  const len = limitValue(length, 0);
  return str.padEnd(length, fillChar);
}

export function queryString(params: NonNullable<ConstructorParameters<typeof URLSearchParams>[0]>, options?: {
  currentParams?: ConstructorParameters<typeof URLSearchParams>[0],
  pathname?: string,
  encode?: boolean,
}) {
  const { currentParams, pathname, encode = true } = options || {};
  const searchParams = new URLSearchParams(currentParams);
  Object.entries(params).forEach(([key, value]) => searchParams.set(key, encode ? encodeURIComponent(value) : value));
  return `${pathname || ''}?${searchParams.toString()}`;
}