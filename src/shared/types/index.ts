export type SelectValueAtom = string | number;

export type SelectValue =
  | SelectValueAtom
  | string[]
  | number[]
  | SelectValueAtom[];

export type Primitive = string
  | number
  | boolean
  | undefined
  | null
