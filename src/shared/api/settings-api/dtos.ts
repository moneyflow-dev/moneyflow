export interface NotificationsTimeSettingsDTO {
  hour: number;
  minute: number;
}

export interface NotificationsSettingsDTO {
  enabled: boolean;
  time: NotificationsTimeSettingsDTO;
}

export interface SettingsDTO {
  notifications: NotificationsSettingsDTO;
}
