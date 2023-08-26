import { Header } from "@widgets/header";

import { BackupSettingCardGroup } from "@features/backup";
import { NotificationsSettingCardGroup } from "@features/notifications";

import {
  AboutUsSettingCardGroup,
  CategoriesSettingCard,
  SettingCardGroup,
} from "@entities/settings";

import { PageLayout } from "@shared/ui/layouts";

export const SettingsPage = () => {
  return (
    <PageLayout hasHorizontalPaddings={false} className="gap-6">
      <Header title="Settings" className="px-5" />
      <main className="flex flex-col gap-6">
        <SettingCardGroup title="Management">
          <CategoriesSettingCard />
        </SettingCardGroup>
        <BackupSettingCardGroup />
        <NotificationsSettingCardGroup />
        <AboutUsSettingCardGroup />
      </main>
    </PageLayout>
  );
};
