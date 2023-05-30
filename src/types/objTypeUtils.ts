// ------------- Unshared (Properties / Keys) Between Two Types ------------- //
export type UnSharedKeys<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? never
      : K
    : K extends keyof U
    ? K extends keyof T
      ? never
      : K
    : never;
}[keyof T | keyof U];

export type UnSharedProperties<T, U> = {
  [K in UnSharedKeys<T, U>]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

/* - Example usage:
  type ObjA = {
    a: number;
    b: string;
    c: boolean;
  };

  type ObjB = {
    b: string;
    c: boolean;
    d: number;
  };

  type Result = UnSharedProperties<ObjA, ObjB>;
  // Result will be { a: number; d: number; }
  type Result2 = UnSharedProperties<ObjB, ObjA>;
  // Result2 will be { a: number; d: number; }
*/
/* -------------------------------------------------------------------------- */

// ------------ Unique (Properties / Keys) Of `T` Compared To `U` ----------- //
export type UniqueKeys<T, U> = {
  [K in keyof T]: K extends keyof U ? never : K;
}[keyof T];

export type UniqueProperties<T, U> = {
  [K in UniqueKeys<T, U>]: T[K];
};

/* - Example usage:
  type ObjA = {
    a: number;
    b: string;
    c: boolean;
  };

  type ObjB = {
    b: string;
    c: boolean;
    d: number;
  };

  type Result = UniqueProperties<ObjA, ObjB>;
  // Result will be { a: number; }
  type Result2 = UniqueProperties<ObjB, ObjA>;
  // Result2 will be { d: number; }
*/
/* -------------------------------------------------------------------------- */
