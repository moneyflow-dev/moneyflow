import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Header } from "@widgets/header";

import {
  CreateExpenseCategoryFormData,
  CreateExpenseCategoryFormFieldset,
  UpdateExpenseCategoryButton,
} from "@features/create-expense-category";
import { DeleteExpenseCategoryButton } from "@features/delete-expense-category";

import {
  ExpenseCategoryCardList,
  useExpenseCategoriesStore,
} from "@entities/category";

import { FloatingActionButton } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { PageLayout } from "@shared/ui/layouts";
import { Link } from "@shared/ui/links";

export const ExpenseCategoryOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible expense category id");
  }
  const { expenseCategories } = useExpenseCategoriesStore();
  const category = expenseCategories[id];
  const subCategories = Object.values(expenseCategories).filter(
    (subCategory) => subCategory.parentId === category?.id,
  );

  const methods = useForm<CreateExpenseCategoryFormData>({
    defaultValues: category,
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
      <PageLayout>
        <FormProvider {...methods}>
          <Header
            title="Category Overview"
            backButton
            rightActions={
              <>
                <DeleteExpenseCategoryButton
                  id={id}
                  beforeDelete={beforeDelete}
                />
                <UpdateExpenseCategoryButton
                  id={id}
                  parentId={category.parentId}
                />
              </>
            }
          />
          <main className="flex flex-col gap-6">
            <CreateExpenseCategoryFormFieldset />
            <div className="flex flex-col gap-3">
              <h2 className="ms-4 text-h2 text-text">Sub-categories</h2>
              {subCategories.length ? (
                <ExpenseCategoryCardList categories={subCategories} />
              ) : (
                <p className="text-body-sm font-medium text-subtext0 indent-4">
                  You don’t have any sub-categories yet. To add first tap add
                  button.
                </p>
              )}
              <Link
                to={`/expense-categories/create?parentId=${category.id}`}
                className="absolute bottom-20 left-1/2 -translate-x-1/2"
              >
                <FloatingActionButton>
                  <PlusIcon size="lg" />
                </FloatingActionButton>
              </Link>
            </div>
          </main>
        </FormProvider>
      </PageLayout>
    )
  );
};
