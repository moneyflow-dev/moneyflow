import { APP_GITHUB_LINK } from "@shared/config/constants";
import { ExternalLinkIcon, GithubIcon } from "@shared/ui/icons";
import { ExternalLink } from "@shared/ui/links";

import { SettingCard } from "./setting-card";

export function GithubSettingCard() {
  return (
    <ExternalLink href={APP_GITHUB_LINK}>
      <SettingCard
        title="GitHub"
        description="Our product is open source"
        icon={<GithubIcon size="md" />}
        rightAction={<ExternalLinkIcon size="sm" className="text-overlay1" />}
      />
    </ExternalLink>
  );
}
