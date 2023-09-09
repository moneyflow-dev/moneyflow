import { DBVersion } from "../version-api";

import { Migration } from "./migration.interface";
import { V1Migration } from "./migrations/v1.migration";
import { V2Migration } from "./migrations/v2.migration";
import { V3Migration } from "./migrations/v3.migration";
import { Migrator } from "./migrator";

const migrations: Record<DBVersion, Migration> = {
  1: new V1Migration(),
  2: new V2Migration(),
  3: new V3Migration(),
};

export const migrator = new Migrator(migrations);
