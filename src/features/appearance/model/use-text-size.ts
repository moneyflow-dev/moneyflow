import { useEffect } from "react";

import { useSettingsStore } from "@entities/settings";

import { setTextSize } from "./set-text-size";

export function useTextSize() {
  const { appearance: appearanceSettings } = useSettingsStore((state) => ({
    appearance: state.appearance,
  }));

  useEffect(() => {
    setTextSize(appearanceSettings.textSize);
  }, [appearanceSettings.textSize]);
}
