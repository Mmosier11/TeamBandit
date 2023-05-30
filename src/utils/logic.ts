/* -------------------------------------------------------------------------- */
/*                                    LOGIC                                   */
/* -------------------------------------------------------------------------- */

import {
  TAnyObject,
  ObjectDescriptor,
  TAnyFunction,
  Numberish,
  NumberishObject,
} from '../types/typeUtils';
/* -------------------------------------------------------------------------- */

export function debounce(fn: Function, delay: number) {
  let timeoutID: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function isSameShape<A extends TAnyObject, B extends TAnyObject>(a: A, b: B) {
  if (b === null || b === undefined) return false;
  return Object.keys(a).every((key) => key in b);
}

export function ObjectIsCircular(value: TAnyObject) {
  for (const key in value) {
    const element = value[key];
    if (Array.isArray(element)) {
      if (typeof element[0] === 'object' && isSameShape(element[0], value)) {
        return key;
      }
    } else if (typeof element === 'object') {
      if (isSameShape(element, value)) {
        return key;
      }
    }
  }
  return false;
}

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
};

export const loop = (fn: (i: number) => any, i: number) =>
  Array(i)
    .fill(0)
    .map((_, i) => i)
    .map(fn);

export function limitValue(value: number, min: number = -Infinity, max: number = Infinity) {
  return Math.min(Math.max(value, min), max);
}

export function inRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

/* -------------------------------------------------------------------------- */
/*                                    ARRAY                                   */
/* -------------------------------------------------------------------------- */

export function NotEmpty<TValue extends Array<any> | null | undefined>(
  array: TValue
): array is NonNullable<TValue> {
  if (array !== null && array !== undefined && array.length > 0) {
    return true;
  }
  return false;
}

export function isEmpty<TValue extends Array<any> | null | undefined>(
  array: TValue | undefined | null | []
): array is undefined | null {
  if (array === null || array === undefined) {
    return true;
  }
  if (array.length <= 0) {
    return true;
  }
  return false;
}

export function sumOfArray<T extends Array<number>>(arr: T) {
  return arr.reduce((a, b) => a + b, 0);
}

export function moreThanOne<TValue extends Array<any> | null | undefined>(
  arr: TValue
): arr is NonNullable<TValue> {
  if (arr !== null && arr !== undefined && arr.length > 1) {
    return true;
  }
  return false;
}

export function flatRecurse<T = TAnyObject>(
  arr: Array<T> | undefined,
  ...props: ((keyof T & string) | 'this')[]
): T[] {
  if (!arr) return [];
  const recurse = (arr: Array<T>, ...props: ((keyof T & string) | 'this')[]) => {
    const result: any[] = [];
    arr.forEach((item) => {
      const dProps = props.filter((prop) => prop !== 'this') as (keyof T & string)[];
      dProps.forEach((prop) => {
        if (Array.isArray(item[prop])) {
          result.push(...recurse(item[prop] as any, ...props));
        }
        if (item[prop]) result.push(item[prop]);
      });
    });
    return result.flat();
  };

  const result = recurse(arr, ...props);
  if (props.includes('this')) result.push(...arr);
  return result.sort((a, b) => {
    const aVal = Object.values(a).filter((v) =>
      ['object', 'boolean'].every((t) => t !== typeof v)
    )[0] as any;
    const bVal = Object.values(b).filter((v) =>
      ['object', 'boolean'].every((t) => t !== typeof v)
    )[0] as any;
    return aVal > bVal ? 1 : -1;
  });
}

// -------------------------------------------------------------------------- //
//-                                  OBJECTS                                 -//
// -------------------------------------------------------------------------- //

export function NotEmptyObject<TValue extends TAnyObject | null | undefined>(
  obj: TValue
): obj is NonNullable<TValue> {
  if (obj !== null && obj !== undefined && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
}

export function isEmptyObject<T extends TAnyObject>(
  obj: T | undefined | null
): obj is undefined | null {
  if (obj !== null && obj !== undefined && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

export function makeObject<D, M>(descriptor: ObjectDescriptor<D, M>): D & M {
  const data: object = descriptor.data || {};
  const methods: object = descriptor.methods || {};
  return { ...data, ...methods } as D & M;
}

export const makeFuncObj = <F extends TAnyFunction, D extends TAnyObject>(fn: F, data: D) => {
  return Object.assign(fn, data);
};

export function makeEnum<T extends string>(...args: T[]) {
  const enumObj = args.reduce((acc, arg) => {
    acc[arg] = arg;
    return acc;
  }, {} as { [K in T]: K });

  const iterableObj = {
    [Symbol.iterator]: function* () {
      for (const key in enumObj) {
        if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
          yield enumObj[key];
        }
      }
    },
  };
  
  const arrayObj = [...iterableObj]
  
  const arrayMethods = {
    map: function (fn: (value: T, index: number, array: T[]) => any) {
      return arrayObj.map(fn);
    },
    filter: function (fn: (value: T, index: number, array: T[]) => any) {
      return arrayObj.filter(fn);
    },
    forEach: function (fn: (value: T, index: number, array: T[]) => any) {
      return arrayObj.forEach(fn);
    },
    reduce: function (fn: (previousValue: any, currentValue: T, currentIndex: number, array: T[]) => any, initialValue: any) {
      return arrayObj.reduce(fn, initialValue);
    }
  }

  return { ...enumObj, ...iterableObj, ...arrayMethods };
}

export function typedEntries<T extends TAnyObject>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function typedFromEntries<T extends readonly [PropertyKey, unknown][]>(
  entries: T
): { [K in T[number][0]]: T[number][1] } {
  return Object.fromEntries(entries) as { [K in T[number][0]]: T[number][1] };
}

export function typedKeys<T extends TAnyObject>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

function mergeObjects<const T extends TAnyObject, const U extends Partial<T>>(
  target: T = {} as T,
  source: U
) {
  const mergedObject = { ...target } as T & U;
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!(key in target)) {
        Object.assign(mergedObject, { [key]: {} as any });
      }
      mergedObject[key] = mergeObjects(target[key] as any, source[key] as any);
    } else {
      Object.assign(mergedObject, { [key]: source[key] });
    }
  }
  return mergedObject;
}
export function deepMerge<const T extends TAnyObject>(...objects: Array<T>) {
  return objects.reduce((mergedObject, object) => mergeObjects(mergedObject, object));
}

export function validKey<T extends TAnyObject>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

// { [K in keyof T]: Numberish<S> }
export function parseToNumberishObject<
  T extends TAnyObject,
  S extends 'string' | 'number' | undefined = undefined
>(obj: T, spec?: S) {
  const onlyNumberish = Object.entries(obj).filter(([key, value]) => isNumberish(value));
  return Object.fromEntries(
    typedEntries(onlyNumberish).map(([key, value]) => [
      key,
      spec === 'string' ? String(value) : spec === undefined ? Number(value) : Number(value),
    ])
  ) as { [K in keyof T]: Numberish<S> };
}

// -------------------------------------------------------------------------- //
//-                                VALUE IS...                               -//
// -------------------------------------------------------------------------- //
export function isPrimitive(
  value: any
): value is string | number | boolean | bigint | symbol | null | undefined {
  return Object(value) !== value;
}

export function isStrumber(value: any): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

export function isNumberish(value: any): value is Numberish {
  const c1 = typeof value === 'string';
  const c2 = RegExp(/^[0-9]+(\.[0-9]+)?$/).test(value);
  return c1 && c2;
}

// -------------------------------------------------------------------------- //
//-                                  FILTERS                                 -//
// -------------------------------------------------------------------------- //
export function filterNonObjectEntries(entries: [string, any][]): [string, any][] {
  return entries.filter(([key, value]) => {
    return (
      value === null ||
      value === undefined ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    );
  });
}

// -------------------------------------------------------------------------- //
//-                               ASYNC VALUES                               -//
// -------------------------------------------------------------------------- //
export const asyncWaitValue = async <T extends TAnyObject>(
  valueFn: () => T,
  condition: (value: T) => boolean,
  interval: number = 500,
  repeat: number = 3
) => {
  type Result = { success: true; data: T } | { success: false; error: Error };
  return new Promise<Result>((resolve, reject) => {
    let count = 0;
    const intervalId = setInterval(() => {
      if (condition(valueFn())) {
        clearInterval(intervalId);
        resolve({ success: true, data: valueFn() });
      } else {
        count++;
        if (count >= repeat) {
          clearInterval(intervalId);
          reject({ success: false, error: new Error('Async wait value timeout') });
        }
      }
    }, interval);
  });
};
