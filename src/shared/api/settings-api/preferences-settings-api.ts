import { Preferences } from "@capacitor/preferences";

import { SettingsDTO } from "./dtos";
import { SettingsAPI } from "./settings-api.interface";

export class PreferencesSettingsAPI implements SettingsAPI {
  private async getState(): Promise<SettingsDTO> {
    const { value } = await Preferences.get({ key: "settings" });
    if (value === null) {
      const state: SettingsDTO = {
        notifications: { enabled: true, time: { hour: 21, minute: 0 } },
      };
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: SettingsDTO) {
    await Preferences.set({
      key: "settings",
      value: JSON.stringify(state),
    });
  }

  async getSettings() {
    return await this.getState();
  }

  async setSettings(settings: SettingsDTO) {
    await this.setState(settings);
  }
}
