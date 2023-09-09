import { UITextSize } from "@entities/settings";

const textSizeToFontScale: Record<UITextSize, number> = {
  [UITextSize.small]: 1,
  [UITextSize.large]: 1.125,
};

export function setTextSize(size: UITextSize) {
  const root = document.documentElement;
  root.style.setProperty("--font-scale", textSizeToFontScale[size].toString());
}
