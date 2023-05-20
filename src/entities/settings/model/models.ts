export interface NotificationsTimeSettings {
  hour: number;
  minute: number;
}

export interface NotificationsSettings {
  enabled: boolean;
  time: NotificationsTimeSettings;
}

export interface Settings {
  notifications: NotificationsSettings;
}
