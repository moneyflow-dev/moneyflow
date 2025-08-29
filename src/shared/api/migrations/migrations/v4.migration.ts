import { Preferences } from "@capacitor/preferences";

import { Migration } from "../migration.interface";

export class V4Migration implements Migration {
  async run(): Promise<void> {
    await Promise.all([Preferences.set({ key: "version", value: "4" })]);
  }
}
