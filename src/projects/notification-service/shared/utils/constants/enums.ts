export enum MessageChannel {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH'
}

export enum MessagePriority {
  LOW = 1,
  MEDIUM = 5,
  HIGH = 10
}

export enum MessageSendingTypes {
  TO_GROUP = 0,
  TO_CLIENT = 1
}

export enum MessageLanguages {
  RU = 'ru_RU',
  UZ = 'uz_UZ'
}

export enum MessageStatuses {
  NEW = 'NEW',
  DONE = 'DONE',
  IN_PROCESS = 'IN_PROCESS',
  FAILED_SEND_TO_QUEUE = 'FAILED_SEND_TO_QUEUE',
  INVALID_DATA = 'INVALID_DATA',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  FREQUENCY_LIMIT_EXCEEDED_ERROR = 'FREQUENCY_LIMIT_EXCEEDED_ERROR',
  DUPLICATE_UUID_ERROR = 'DUPLICATE_UUID_ERROR',
  TEMPLATE_NOT_FOUND_ERROR = 'TEMPLATE_NOT_FOUND_ERROR',
  FAILED = 'FAILED'
}

export enum GroupedMessageStatuses {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSE = 'PAUSE',
  STOP = 'STOP',
}
