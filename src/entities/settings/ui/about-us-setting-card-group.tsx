import { APP_GITHUB_LINK, APP_VERSION } from "@shared/config/constants";

import { GithubSettingCard } from "./github-setting-card";
import { SettingCardGroup } from "./setting-card-group";
import { VersionSettingCard } from "./version-setting-card";

export function AboutUsSettingCardGroup() {
  if (!APP_VERSION && !APP_GITHUB_LINK) {
    return null;
  }

  return (
    <SettingCardGroup title="About Us">
      <GithubSettingCard />
      <VersionSettingCard />
    </SettingCardGroup>
  );
}
