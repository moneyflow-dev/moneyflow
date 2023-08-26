import { Preferences } from "@capacitor/preferences";

import { DBVersion, DeviceDBVersion } from "./dtos";
import { VersionAPI } from "./version-api.interface";

export class PreferencesVersionAPI implements VersionAPI {
  private async getState(): Promise<DeviceDBVersion> {
    const { value } = await Preferences.get({ key: "version" });
    if (value === null) {
      return 0;
    }
    return Number(value) as DBVersion;
  }

  private async setState(state: DBVersion) {
    await Preferences.set({
      key: "version",
      value: String(state),
    });
  }

  async getVersion(): Promise<DeviceDBVersion> {
    return await this.getState();
  }

  async setVersion(version: DBVersion): Promise<void> {
    await this.setState(version);
  }
}
