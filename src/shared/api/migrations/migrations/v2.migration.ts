import { Preferences } from "@capacitor/preferences";

import { MigrationError } from "../errors";
import { Migration } from "../migration.interface";

/** This migration adds precision field to currency */
export class V2Migration implements Migration {
  async run(): Promise<void> {
    const { value: currenciesJsonString } = await Preferences.get({
      key: "currencies",
    });

    if (currenciesJsonString === null) {
      throw new MigrationError(
        "No currencies field in preferences in v2 migration",
      );
    }

    const currencies = JSON.parse(currenciesJsonString as string);

    for (const currency of Object.values(currencies.currencies)) {
      (currency as { precision: number }).precision = 2;
    }

    await Promise.all([
      Preferences.set({ key: "version", value: "2" }),
      Preferences.set({ key: "currencies", value: JSON.stringify(currencies) }),
    ]);
  }
}
