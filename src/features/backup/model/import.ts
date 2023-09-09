import { Buffer } from "buffer";

import { FilePicker } from "@capawesome/capacitor-file-picker";
import { z } from "zod";

import { migrator } from "@shared/api/migrations";
import { DBVersion, versionApi } from "@shared/api/version-api";

import { BackupImporter } from "./backup-importer.interface";
import { BackupValidationError } from "./errors";
import { V1BackupImporter } from "./versions/v1/v1-backup.importer";
import { v1BackupConsistentSchema } from "./versions/v1/v1-backup.schema";
import { V2BackupImporter } from "./versions/v2/v2-backup.importer";
import { v2BackupConsistentSchema } from "./versions/v2/v2-backup.schema";
import { V3BackupImporter } from "./versions/v3/v3-backup.importer";
import { v3BackupConsistentSchema } from "./versions/v3/v3-backup.schema";
import {
  BackupWithVersion,
  backupVersionSchema,
} from "./versions/version.schema";

const backupSchemas: Record<DBVersion, z.ZodSchema<BackupWithVersion>> = {
  1: v1BackupConsistentSchema,
  2: v2BackupConsistentSchema,
  3: v3BackupConsistentSchema,
};

const backupImporters: Record<DBVersion, BackupImporter> = {
  1: new V1BackupImporter(),
  2: new V2BackupImporter(),
  3: new V3BackupImporter(),
};

export async function importBackup() {
  let result;
  try {
    result = await FilePicker.pickFiles({
      types: ["application/json"],
      readData: true,
    });
  } catch (err) {
    return;
  }
  const data = result.files[0]?.data;

  if (typeof data === "undefined") {
    return;
  }

  const backup = parseBackupJson(Buffer.from(data, "base64").toString());
  const backupWithVersion = validateBackup(backup);
  await backupImporters[backupWithVersion.version].import(backupWithVersion);
  await migrator.migrate(await versionApi.getVersion());
}

function validateBackup(backup: unknown): BackupWithVersion {
  const versionValidation = backupVersionSchema.safeParse(backup);

  if (!versionValidation.success) {
    console.error(versionValidation.error);
    throw new BackupValidationError();
  }

  const backupWithVersion = versionValidation.data;

  const backupValidation =
    backupSchemas[backupWithVersion.version].safeParse(backup);

  if (!backupValidation.success) {
    console.error(backupValidation.error);
    throw new BackupValidationError();
  }

  return backupValidation.data;
}

function parseBackupJson(data: string): unknown {
  try {
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new BackupValidationError();
    }
    throw err;
  }
}
