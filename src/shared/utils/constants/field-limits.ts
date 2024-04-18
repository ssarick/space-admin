export const fieldLimits = {
  contractId: {
    maxLength: 10
  },
  borrowerId: {
    maxLength: 8
  },
  ownerId: {
    maxLength: 8
  },
  coincidence: {
    min: 0,
    max: 100
  },
  panMaskedLastNumbers: {
    maxLength: 4
  },
  fio: {
    maxLength: 128,
    minLength: 1
  },
  pidSnIdCard: {
    maxLength: 9,
    minLength: 0
  },
  pidSnOther: {
    maxLength: 9,
    minLength: 1
  },
  pidNum: {
    maxLength: 15,
    minLength: 2
  },
  email: {
    maxLength: 128,
    minLength: 3
  },
  phrase: {
    maxLength: 128,
    minLength: 4
  },
  login: {
    maxLength: 32,
    minLength: 4
  },
  certificatePin: {
    maxLength: 8,
    minLength: 4
  },
  clientCode: {
    maxLength: 8,
    minLength: 8
  },
  pinfl: {
    maxLength: 14,
    minLength: 14
  },
  inn: {
    minLength: 8,
    maxLength: 9
  },
  phone: {
    minLength: 4,
    maxLength: 12
  },
  branch: {
    minLength: 5,
    maxLength: 5
  },
  search: {
    maxLength: 255
  },
  rrn: {
    minLength: 12,
    maxLength: 12
  }
} as const;
