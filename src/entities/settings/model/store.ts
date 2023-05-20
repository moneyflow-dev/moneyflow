import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { settingsApi } from "@shared/api/settings-api";

import { NotificationsSettings, Settings } from "./models";

interface SettingsStoreState extends Settings {
  fetchSettings(): Promise<void>;
  setNotificationsSettings(settings: NotificationsSettings): Promise<void>;
}

export const useSettingsStore = create<SettingsStoreState>()(
  devtools((set) => ({
    notifications: {
      enabled: true,
      time: {
        hour: 11,
        minute: 43,
      },
    },
    async fetchSettings() {
      set(await settingsApi.getSettings());
    },
    async setNotificationsSettings(settings) {
      await settingsApi.setSettings({ notifications: settings });
      set({ notifications: settings });
    },
  })),
);
