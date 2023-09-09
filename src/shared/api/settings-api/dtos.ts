export interface NotificationsTimeSettingsDTO {
  hour: number;
  minute: number;
}

export interface NotificationsSettingsDTO {
  enabled: boolean;
  time: NotificationsTimeSettingsDTO;
}

export const UITextSizeDTO = {
  small: "small",
  large: "large",
} as const;

export type UITextSizeDTO = (typeof UITextSizeDTO)[keyof typeof UITextSizeDTO];

export interface AppearanceSettingsDTO {
  textSize: UITextSizeDTO;
}

export interface SettingsDTO {
  notifications: NotificationsSettingsDTO;
  appearance: AppearanceSettingsDTO;
}
