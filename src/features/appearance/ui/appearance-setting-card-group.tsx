import { SettingCardGroup } from "@entities/settings";

import { TextSizeSettingCard } from "./text-size-setting-card";

export function AppearanceSettingCardGroup() {
  return (
    <SettingCardGroup title="Appearance">
      <TextSizeSettingCard />
    </SettingCardGroup>
  );
}
