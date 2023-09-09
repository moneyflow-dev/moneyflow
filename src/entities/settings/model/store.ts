import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { settingsApi } from "@shared/api/settings-api";

import {
  AppearanceSettings,
  NotificationsSettings,
  Settings,
  UITextSize,
} from "./models";

interface SettingsStoreState extends Settings {
  fetchSettings(): Promise<void>;
  setNotificationsSettings(settings: NotificationsSettings): Promise<void>;
  setAppearanceSettings(settings: AppearanceSettings): Promise<void>;
}

export const useSettingsStore = create<SettingsStoreState>()(
  devtools((set, get) => ({
    notifications: {
      enabled: true,
      time: {
        hour: 21,
        minute: 0,
      },
    },
    appearance: {
      textSize: UITextSize.large,
    },
    async fetchSettings() {
      set(await settingsApi.getSettings());
    },
    async setNotificationsSettings(settings) {
      await settingsApi.setSettings({
        ...get(),
        notifications: settings,
      });
      set({ notifications: settings });
    },
    async setAppearanceSettings(settings) {
      await settingsApi.setSettings({ ...get(), appearance: settings });
      set({ appearance: settings });
    },
  })),
);
