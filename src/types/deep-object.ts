/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/deepKeys.ts

export type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

/**
 * Safe DeepKeys — explores only a few levels and stops before TS explodes.
 */
export type DeepKeys<T, Depth extends number = 3> = T extends object
  ? Depth extends 0
    ? never
    : {
        [K in keyof T & string]:
          | K
          | `${K}${DotPrefix<
              T[K] extends object ? DeepKeys<T[K], Decrement[Depth]> : ""
            >}`;
      }[keyof T & string]
  : never;

// helper to count down recursion depth
type Decrement = [never, 0, 1, 2, 3, 4, 5];

type IsPlainObject<T> = T extends object
  ? T extends (...args: any[]) => any
    ? false
    : T extends any[]
      ? false
      : true
  : false;

/**
 * DeepValue: resolve value type at a "a.b.c" path.
 * If too deep or TS gets tired, falls back to `any`.
 */
export type DeepValue<T, K extends string> = K extends keyof T
  ? IsPlainObject<T[K]> extends true
    ? undefined
    : T[K]
  : K extends `${infer P}.${infer Rest}`
    ? P extends keyof T
      ? DeepValue<T[P], Rest>
      : undefined
    : undefined;
