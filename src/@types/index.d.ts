declare module 'normalize-package-data' {
    function normalize(data: any, warn?: (warning: string) => void, strict?: boolean): void;
    export = normalize;
  }

  declare module 'prop-types' {
    export type Validator<T> = (
      object: { [key: string]: any },
      key: string,
      componentName: string,
      ...rest: any[]
    ) => Error | null;
  
    export interface Requireable<T> extends Validator<T> {
      isRequired: Validator<T>;
    }
  
    export type ValidationMap<T> = {
      [K in keyof T]?: Validator<T[K]>;
    };
  
    export const string: Requireable<string>;
    export const bool: Requireable<boolean>;
    export const number: Requireable<number>;
    export const array: Requireable<any[]>;
    export const object: Requireable<object>;
    export const func: Requireable<Function>;
    export const node: Requireable<any>;
    export const element: Requireable<any>;
    export const any: Requireable<any>;
    export const arrayOf: <T>(type: Validator<T>) => Requireable<T[]>;
    export const objectOf: <T>(type: Validator<T>) => Requireable<{ [key: string]: T }>;
    export const oneOfType: (types: Array<Validator<any>>) => Requireable<any>;
    export const oneOf: <T>(types: T[]) => Requireable<T>;
    export const shape: <T>(type: ValidationMap<T>) => Requireable<T>;
    export const exact: <T>(type: ValidationMap<T>) => Requireable<T>;
    export const instanceOf: <T>(expectedClass: new (...args: any[]) => T) => Requireable<T>;
  
    export default {
      string,
      bool,
      number,
      array,
      object,
      func,
      node,
      element,
      any,
      arrayOf,
      objectOf,
      oneOfType,
      oneOf,
      shape,
      exact,
      instanceOf,
    };
  }