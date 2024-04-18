export enum NotificationType {
  NOTIFICATIONS,
  ERRORS
}

export interface INotification {
  id?: number | null
  text?: string | null
}

export interface INotificationError extends INotification {}
