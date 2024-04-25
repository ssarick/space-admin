
export interface TerminalInfo {
  terminalId?: string | null
  merchantId?: string | null
  name?: string | null
  port?: string | null
  operationType?: string | null
  partner?: string | null
  createdDate?: string | null
  updatedDate?: string | null
}

export interface TerminalInfoCreatePayload extends
  Omit<TerminalInfo, 'terminalId' | 'createdDate' | 'updatedDate'> {}

export interface TerminalInfoFormModel extends
  Partial<TerminalInfoCreatePayload> {}
