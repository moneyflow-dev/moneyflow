import React from "react";

import { APP_RELEASES_LINK, APP_VERSION } from "@shared/config/constants";
import { CodeBranchIcon, ExternalLinkIcon } from "@shared/ui/icons";

import { SettingCard } from "./setting-card";

export function VersionSettingCard() {
  if (!APP_VERSION) {
    return null;
  }

  const Wrapper = APP_RELEASES_LINK ? "a" : React.Fragment;

  return (
    <Wrapper href={APP_RELEASES_LINK}>
      <SettingCard
        title="Version"
        description={APP_VERSION}
        icon={<CodeBranchIcon size="md" />}
        rightAction={<ExternalLinkIcon size="sm" className="text-overlay1" />}
      />
    </Wrapper>
  );
}
