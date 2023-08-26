import { DBVersion } from "../version-api";

import { Migration } from "./migration.interface";
import { V1Migration } from "./migrations/v1.migration";
import { Migrator } from "./migrator";

const migrations: Record<DBVersion, Migration> = { 1: new V1Migration() };

export const migrator = new Migrator(migrations);
