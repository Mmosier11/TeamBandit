// -------------------------------------------------------------------------- //
//-                                TYPE UTILS                                -//
// -------------------------------------------------------------------------- //

// import { SafeParseReturnType } from 'zod';

/* eslint-disable @typescript-eslint/ban-types */
export type WithChildren<P = unknown> = P & { children: React.ReactNode | undefined };
export type WithOptionalChildren<P = unknown> = P & { children?: React.ReactNode };

export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

export type DeepNonNullable<T> = {
  [P in keyof T]-?: T[P] extends null | undefined
    ? never
    : T[P] extends (infer U)[]
    ? NonNullable<U>[]
    : T[P] extends object
    ? DeepNonNullable<T[P]>
    : NonNullable<T[P]>;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type TAnyObject<T = any> = Record<string, T>;

export type TAnyFunction<A = any, R = any> = (...args: A[]) => R;

export type ObjectWithChildren<OType extends TAnyObject> = {
  [K in keyof OType]: OType[K];
} & {
  children?: ObjectWithChildren<OType>[];
};

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type MergeTypes<T extends any[]> = T extends [infer FirstType, ...infer RestTypes]
  ? FirstType & MergeTypes<RestTypes>
  : unknown;

export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

export type IsEqual<X, Y> = IfEquals<X, Y, true, false>;

export type ArrayOfKeys<T extends TAnyObject, C extends Boolean = false> = C extends true
  ? Capitalize<keyof T & string>[]
  : (keyof T & string)[];

export type KeyTuple<T extends TAnyObject | Array<any>> = T extends Array<any>
  ? T[number]
  : T extends TAnyObject
  ? keyof T & string
  : never;

export type NotFunction<T> = T extends Function ? never : T;

export type MakePropsOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IncludeOptionals<T> = {
  [K in keyof T]-?: T[K];
};

export type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

export type BooleanRecord<T> = {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: T[K];
};

export type DataBooleanProps<T> = BooleanRecord<{
  [K in keyof T as `data-${K & string}`]: T[K];
}>;

export type PropsWithoutChildren<P> = P extends { children?: infer C } ? Omit<P, 'children'> : P;

export type Numberish<T extends 'string' | 'number' | undefined | unknown = undefined> =
  T extends 'string' ? string : T extends 'number' ? number : `${number}` | number;

export type NumberishObject<T extends TAnyObject> = {
  -readonly [K in keyof T as T[K] extends 'string'
    ? K
    : T[K] extends 'number'
    ? K
    : T[K] extends `${number}` | number
    ? K
    : never]: T[K];
};

export type RequestHeaders = Partial<
  Record<
    KeyTuple<{
      accept?: string | undefined;
      'accept-language'?: string | undefined;
      'accept-patch'?: string | undefined;
      'accept-ranges'?: string | undefined;
      'access-control-allow-credentials'?: string | undefined;
      'access-control-allow-headers'?: string | undefined;
      'access-control-allow-methods'?: string | undefined;
      'access-control-allow-origin'?: string | undefined;
      'access-control-expose-headers'?: string | undefined;
      'access-control-max-age'?: string | undefined;
      'access-control-request-headers'?: string | undefined;
      'access-control-request-method'?: string | undefined;
      age?: string | undefined;
      allow?: string | undefined;
      'alt-svc'?: string | undefined;
      authorization?: string | undefined;
      'cache-control'?: string | undefined;
      connection?: string | undefined;
      'content-disposition'?: string | undefined;
      'content-encoding'?: string | undefined;
      'content-language'?: string | undefined;
      'content-length'?: string | undefined;
      'content-location'?: string | undefined;
      'content-range'?: string | undefined;
      'content-type'?: string | undefined;
      cookie?: string | undefined;
      date?: string | undefined;
      etag?: string | undefined;
      expect?: string | undefined;
      expires?: string | undefined;
      forwarded?: string | undefined;
      from?: string | undefined;
      host?: string | undefined;
      'if-match'?: string | undefined;
      'if-modified-since'?: string | undefined;
      'if-none-match'?: string | undefined;
      'if-unmodified-since'?: string | undefined;
      'last-modified'?: string | undefined;
      location?: string | undefined;
      origin?: string | undefined;
      pragma?: string | undefined;
      'proxy-authenticate'?: string | undefined;
      'proxy-authorization'?: string | undefined;
      'public-key-pins'?: string | undefined;
      range?: string | undefined;
      referer?: string | undefined;
      'retry-after'?: string | undefined;
      'sec-websocket-accept'?: string | undefined;
      'sec-websocket-extensions'?: string | undefined;
      'sec-websocket-key'?: string | undefined;
      'sec-websocket-protocol'?: string | undefined;
      'sec-websocket-version'?: string | undefined;
      'set-cookie'?: string[] | undefined;
      'strict-transport-security'?: string | undefined;
      tk?: string | undefined;
      trailer?: string | undefined;
      'transfer-encoding'?: string | undefined;
      upgrade?: string | undefined;
      'user-agent'?: string | undefined;
      vary?: string | undefined;
      via?: string | undefined;
      warning?: string | undefined;
      'www-authenticate'?: string | undefined;
    }>,
    string
  >
>;

export type SafeParse<T> = {
  success: true;
  data: T;
  error: null;
} | {
  success: false;
  data: null;
  error: Error | unknown;
};

export type Last<T extends any[] | readonly any[]> = T extends [...infer _, infer L]
  ? L
  : T extends readonly [...infer _, infer L]
  ? L
  : never;
