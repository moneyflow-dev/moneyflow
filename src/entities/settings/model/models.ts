export interface NotificationsTimeSettings {
  hour: number;
  minute: number;
}

export interface NotificationsSettings {
  enabled: boolean;
  time: NotificationsTimeSettings;
}

export const UITextSize = {
  small: "small",
  large: "large",
} as const;

export type UITextSize = (typeof UITextSize)[keyof typeof UITextSize];

export interface AppearanceSettings {
  textSize: UITextSize;
}

export interface Settings {
  notifications: NotificationsSettings;
  appearance: AppearanceSettings;
}
