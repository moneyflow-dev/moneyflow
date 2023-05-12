import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import {
  CreateIncomeCategoryFormData,
  CreateIncomeCategoryFormFieldset,
  UpdateIncomeCategoryButton,
  createIncomeCategoryFormSchema,
} from "@features/create-income-category";
import { DeleteIncomeCategoryButton } from "@features/delete-income-category";

import {
  IncomeCategoryCardList,
  useIncomeCategoriesStore,
} from "@entities/category";

import { FloatingActionButton } from "@shared/ui/buttons";
import { Divider } from "@shared/ui/dividers";
import { PlusIcon } from "@shared/ui/icons";
import { PageLayout } from "@shared/ui/layouts";
import { Link } from "@shared/ui/links";

export const IncomeCategoryOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible income category id");
  }
  const { incomeCategories } = useIncomeCategoriesStore();
  const category = incomeCategories[id];
  const subCategories = Object.values(incomeCategories).filter(
    (subCategory) => subCategory.parentId === category?.id,
  );

  const methods = useForm<CreateIncomeCategoryFormData>({
    defaultValues: category,
    resolver: zodResolver(createIncomeCategoryFormSchema),
  });
  const { reset } = methods;

  useEffect(() => {
    reset(category);
  }, [id, category, reset]);

  const beforeDelete = () => {
    reset({ title: "" });
  };

  return (
    category && (
      <PageLayout className="pb-44">
        <FormProvider {...methods}>
          <Header
            title="Category Overview"
            backButton
            rightActions={
              <>
                <DeleteIncomeCategoryButton
                  id={id}
                  beforeDelete={beforeDelete}
                />
                <UpdateIncomeCategoryButton
                  id={id}
                  parentId={category.parentId}
                />
              </>
            }
          />
          <main className="flex flex-col gap-6">
            <CreateIncomeCategoryFormFieldset />
            <div className="flex flex-col gap-3">
              <h2 className="ms-4 text-h2 text-text">Sub-categories</h2>
              {subCategories.length ? (
                <IncomeCategoryCardList categories={subCategories} />
              ) : (
                <p className="text-body-sm font-medium text-subtext0 indent-4">
                  You don’t have any sub-categories yet. To add first tap add
                  button.
                </p>
              )}
              <Link
                to={`/income-categories/create?parentId=${category.id}`}
                className="fixed bottom-20 left-1/2 -translate-x-1/2"
              >
                <FloatingActionButton>
                  <PlusIcon size="lg" />
                </FloatingActionButton>
              </Link>
            </div>
            <Divider />
            {category && (
              <GroupedTransactionList filters={{ incomeCategoryId: id }} />
            )}
          </main>
        </FormProvider>
      </PageLayout>
    )
  );
};
