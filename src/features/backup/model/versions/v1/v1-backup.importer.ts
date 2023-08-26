import { Preferences } from "@capacitor/preferences";

import { BackupImporter } from "../../backup-importer.interface";

import { V1Backup } from "./v1-backup.schema";

export class V1BackupImporter implements BackupImporter {
  async import(backup: V1Backup): Promise<void> {
    await Promise.all([
      Preferences.set({ key: "version", value: String(backup.version) }),
      Preferences.set({
        key: "currencies",
        value: JSON.stringify(backup.currencies),
      }),
      Preferences.set({
        key: "accounts",
        value: JSON.stringify(backup.accounts),
      }),
      Preferences.set({
        key: "expense-categories",
        value: JSON.stringify(backup.expenseCategories),
      }),
      Preferences.set({
        key: "income-categories",
        value: JSON.stringify(backup.incomeCategories),
      }),
      Preferences.set({
        key: "expenses",
        value: JSON.stringify(backup.expenses),
      }),
      Preferences.set({
        key: "incomes",
        value: JSON.stringify(backup.incomes),
      }),
      Preferences.set({
        key: "transfers",
        value: JSON.stringify(backup.transfers),
      }),
      Preferences.set({
        key: "settings",
        value: JSON.stringify(backup.settings),
      }),
    ]);
  }
}
