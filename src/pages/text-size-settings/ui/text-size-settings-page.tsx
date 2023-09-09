import { Header } from "@widgets/header";

import { TextSizePicker } from "@features/appearance";

import { PageLayout } from "@shared/ui/layouts";

export function TextSizeSettingsPage() {
  return (
    <PageLayout>
      <Header title="Text size settings" />
      <TextSizePicker />
    </PageLayout>
  );
}
