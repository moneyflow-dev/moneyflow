import { GithubSettingCard } from "./github-setting-card";
import { SettingCardGroup } from "./setting-card-group";
import { VersionSettingCard } from "./version-setting-card";

export function AboutUsSettingCardGroup() {
  return (
    <SettingCardGroup title="About Us">
      <GithubSettingCard />
      <VersionSettingCard />
    </SettingCardGroup>
  );
}
