import { Preferences } from "@capacitor/preferences";

import { Migration } from "../migration.interface";

export class V1Migration implements Migration {
  async run(): Promise<void> {
    await Promise.all([
      Preferences.set({ key: "version", value: "1" }),
      Preferences.set({
        key: "currencies",
        value: JSON.stringify({ order: [], currencies: {} }),
      }),
      Preferences.set({
        key: "accounts",
        value: JSON.stringify({ order: [], accounts: {} }),
      }),
      Preferences.set({ key: "expenses", value: JSON.stringify({}) }),
      Preferences.set({ key: "incomes", value: JSON.stringify({}) }),
      Preferences.set({ key: "transfers", value: JSON.stringify({}) }),
      Preferences.set({
        key: "expense-categories",
        value: JSON.stringify({}),
      }),
      Preferences.set({
        key: "income-categories",
        value: JSON.stringify({}),
      }),
      Preferences.set({
        key: "settings",
        value: JSON.stringify({
          notifications: { enabled: true, time: { hour: 21, minute: 0 } },
        }),
      }),
    ]);
  }
}
