import { UITextSize, useSettingsStore } from "@entities/settings";

import {
  TabLikeRadioButton,
  TabLikeRadioButtonGroup,
} from "@shared/ui/radio-buttons";

import { setTextSize } from "../model/set-text-size";

import { textSizeToString } from "./format";

export function TextSizePicker() {
  const { appearance: appearanceSettings, setAppearanceSettings } =
    useSettingsStore((state) => ({
      appearance: state.appearance,
      setAppearanceSettings: state.setAppearanceSettings,
    }));

  const onChange = (value: UITextSize) => {
    setAppearanceSettings({ ...appearanceSettings, textSize: value });
    setTextSize(value);
  };

  return (
    <TabLikeRadioButtonGroup
      label="Text size"
      value={appearanceSettings.textSize}
      onChange={onChange}
    >
      <TabLikeRadioButton value={UITextSize.small}>
        {textSizeToString[UITextSize.small]}
      </TabLikeRadioButton>
      <TabLikeRadioButton value={UITextSize.large}>
        {textSizeToString[UITextSize.large]}
      </TabLikeRadioButton>
    </TabLikeRadioButtonGroup>
  );
}
