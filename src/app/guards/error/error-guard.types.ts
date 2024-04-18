import { ResultProps } from 'naive-ui';

export enum ErrorGuardStatus {
  INTERNAL_ERROR = '500',
  NOT_FOUND = '404',
  FORBIDDEN = '403'
}

export interface IErrorGuard extends
  Pick<ResultProps,
    'description'
    | 'title'
  > {
  status?: ErrorGuardStatus
  handled?: boolean
  btnText?: string
  onClickBtn?: () => void
}
