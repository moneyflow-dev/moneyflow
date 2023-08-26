export interface BackupImporter {
  import(backup: unknown): Promise<void>;
}
