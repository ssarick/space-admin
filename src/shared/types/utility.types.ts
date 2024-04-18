import type { Ref } from 'vue';

export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}

export type PickEqual<T extends object, V extends T[keyof T]> = {
  [P in keyof T as T[P] extends V ? P : never]: T[P]
}

export type NonNullableObjectValues<T extends object> = Required<{
  [P in keyof T]: Exclude<T[P], null>
}>

export type ToRefValues<T> = T extends never ? never : Ref<T>

export type MergeObjects<
  A extends object,
  B extends { [P in keyof A]: unknown },
  P extends keyof A
> = Omit<Omit<A, P> & Pick<B, P>, never>
