import { SettingCard } from "@entities/settings";

import { DownloadIcon } from "@shared/ui/icons";

import { exportBackup } from "../model/export";

export const ExportBackupSettingCard = () => {
  return (
    <SettingCard
      icon={<DownloadIcon size="md" />}
      title="Export backup"
      description="Export backup to file"
      onClick={exportBackup}
    />
  );
};
