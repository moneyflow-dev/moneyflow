import { SettingCardGroup } from "@entities/settings";

import { ExportBackupSettingCard } from "./export-backup-setting-card";
import { ImportBackupSettingCard } from "./import-backup-setting-card";

export const BackupSettingCardGroup = () => {
  return (
    <SettingCardGroup title="Backup">
      <ExportBackupSettingCard />
      <ImportBackupSettingCard />
    </SettingCardGroup>
  );
};
