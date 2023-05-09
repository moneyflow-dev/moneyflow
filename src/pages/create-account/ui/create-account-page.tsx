import { Header } from "@widgets/header";

import { CreateAccountForm } from "@features/create-account";

import { PageLayout } from "@shared/ui/layouts";

export const CreateAccountPage = () => {
  return (
    <PageLayout className="h-full">
      <Header title="Add Account" backButton />
      <CreateAccountForm className="flex-1" />
    </PageLayout>
  );
};
