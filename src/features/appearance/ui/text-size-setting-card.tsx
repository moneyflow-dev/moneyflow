import { SettingCard, useSettingsStore } from "@entities/settings";

import { FontIcon, RightChevronIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

import { textSizeToString } from "./format";

export function TextSizeSettingCard() {
  const { appearance: appearanceSettings } = useSettingsStore((state) => ({
    appearance: state.appearance,
  }));

  return (
    <Link to="/text-size-settings">
      <SettingCard
        title="Text size"
        description={textSizeToString[appearanceSettings.textSize]}
        icon={<FontIcon size="md" />}
        rightAction={<RightChevronIcon size="sm" className="text-overlay1" />}
      />
    </Link>
  );
}
