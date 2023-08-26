import { Migration } from "./migration.interface";

export class Migrator {
  constructor(private readonly migrations: Record<number, Migration>) {}

  async migrate(currentVersion: number) {
    const migrationsToRun = Object.entries(this.migrations)
      .filter(([version]) => Number(version) > currentVersion)
      .sort(([version1], [version2]) => Number(version1) - Number(version2))
      .map(([_, migration]) => migration);

    for (const migration of migrationsToRun) {
      await migration.run();
    }
  }
}
