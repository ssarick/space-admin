export interface IBaseDetailCardHead {
  text?: string;
}

export interface IBaseDetailCardBody extends IBaseDetailCardHead {
  title?: string | number;
  visibility?: boolean;
}
