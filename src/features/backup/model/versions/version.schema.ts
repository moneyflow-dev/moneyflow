import { z } from "zod";

import { DBVersion } from "@shared/api/version-api";

export const backupVersionSchema = z.object({
  version: z.nativeEnum(DBVersion),
});

export type BackupWithVersion = z.infer<typeof backupVersionSchema>;
