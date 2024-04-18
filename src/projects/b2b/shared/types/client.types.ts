export enum ClientStateId {
  BLOCKED,
  ACTIVE,
}

export interface IClient {
  branch: string | null;
  clientCode: string | null;
  inn: string | null;
  pinfl: string | null;
  clientName: string | null;
  ceoName: string | null;
  stateId: ClientStateId | null;
  stateReason: string | null;
  createDate: string | null;
  fillDate: string | null;
}

export interface IClientStatusUpdateBody {
  state: ClientStateId;
  clientBlockingReasonId: number | null;
}

export interface IClientStatusUpdatedResponse
  extends Pick<IClient, 'branch' | 'clientCode'> {
  newStatus: ClientStateId | null;
}

export interface IClientFetchByAnyCodeParams {
  branch: string
  anyCode: string
}
