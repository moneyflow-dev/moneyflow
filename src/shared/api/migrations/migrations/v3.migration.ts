import { Preferences } from "@capacitor/preferences";

import { MigrationError } from "../errors";
import { Migration } from "../migration.interface";

/** This migration adds text size setting to settings */
export class V3Migration implements Migration {
  async run(): Promise<void> {
    const { value: settingsJsonString } = await Preferences.get({
      key: "settings",
    });

    if (settingsJsonString === null) {
      throw new MigrationError(
        "No settings field in preferences in v3 migration",
      );
    }

    const settings = JSON.parse(settingsJsonString);
    settings.appearance = { textSize: "small" };

    await Promise.all([
      Preferences.set({ key: "version", value: "3" }),
      Preferences.set({ key: "settings", value: JSON.stringify(settings) }),
    ]);
  }
}
