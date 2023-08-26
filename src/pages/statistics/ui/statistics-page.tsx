import { twMerge } from "tailwind-merge";

import { Header } from "@widgets/header";

import { PageLayout } from "@shared/ui/layouts";

export const StatisticsPage = () => {
  return (
    <PageLayout>
      <Header title="Statistics" />
      <p
        className={twMerge(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
          "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
        )}
      >
        This page is under development
      </p>
    </PageLayout>
  );
};
