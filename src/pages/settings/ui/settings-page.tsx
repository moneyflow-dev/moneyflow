import { Header } from "@widgets/header";

import { CategoriesSettingCard, SettingCardGroup } from "@entities/settings";

import { PageLayout } from "@shared/ui/layouts";

export const SettingsPage = () => {
  return (
    <PageLayout hasHorizontalPaddings={false} className="gap-6">
      <Header title="Settings" className="px-5" />
      <main className="flex flex-col gap-6">
        <SettingCardGroup title="Management">
          <CategoriesSettingCard />
        </SettingCardGroup>
      </main>
    </PageLayout>
  );
};
