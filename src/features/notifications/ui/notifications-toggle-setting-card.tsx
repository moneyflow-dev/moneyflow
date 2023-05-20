import { SettingCard, useSettingsStore } from "@entities/settings";

import { BellIcon } from "@shared/ui/icons";
import { Toggle } from "@shared/ui/toggles";

export const NotificationsToggleSettingCard = () => {
  const { notifications: notificationsSettings, setNotificationsSettings } =
    useSettingsStore((state) => ({
      notifications: state.notifications,
      setNotificationsSettings: state.setNotificationsSettings,
    }));
  const onClick = () => {
    setNotificationsSettings({
      ...notificationsSettings,
      enabled: !notificationsSettings.enabled,
    });
  };

  return (
    <SettingCard
      title="Remind about transactions"
      description="Daily notifications"
      onClick={onClick}
      icon={<BellIcon size="md" />}
      rightAction={<Toggle checked={notificationsSettings.enabled} />}
    />
  );
};
