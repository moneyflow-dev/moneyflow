import { APP_RELEASES_LINK, APP_VERSION } from "@shared/config/constants";
import { CodeBranchIcon, ExternalLinkIcon } from "@shared/ui/icons";
import { ExternalLink } from "@shared/ui/links";

import { SettingCard } from "./setting-card";

export function VersionSettingCard() {
  return (
    <ExternalLink href={APP_RELEASES_LINK}>
      <SettingCard
        title="Version"
        description={APP_VERSION}
        icon={<CodeBranchIcon size="md" />}
        rightAction={<ExternalLinkIcon size="sm" className="text-overlay1" />}
      />
    </ExternalLink>
  );
}
