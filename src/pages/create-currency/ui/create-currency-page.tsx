import { Header } from "@widgets/header";

import { CreateCurrencyForm } from "@features/create-currency";

import { PageLayout } from "@shared/ui/layouts";

export const CreateCurrencyPage = () => {
  return (
    <PageLayout className="h-full">
      <Header title="Add Currency" backButton />
      <CreateCurrencyForm />
    </PageLayout>
  );
};
