import { SettingCardGroup } from "@entities/settings";

import { NotificationsTimeSettingCard } from "./notifications-time-setting-card";
import { NotificationsToggleSettingCard } from "./notifications-toggle-setting-card";

export const NotificationsSettingCardGroup = () => {
  return (
    <SettingCardGroup title="Notifications">
      <NotificationsToggleSettingCard />
      <NotificationsTimeSettingCard />
    </SettingCardGroup>
  );
};
