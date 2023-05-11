import { useState } from "react";

import { FloatingActionButton } from "@shared/ui/buttons";
import {
  DownArrowIcon,
  PlusIcon,
  RightLeftArrowIcon,
  UpArrowIcon,
} from "@shared/ui/icons";
import { Link } from "@shared/ui/links";
import { ModalWithoutContent } from "@shared/ui/modals";

export const CreateTransactionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenClick = () => setIsOpen((state) => !state);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <ModalWithoutContent isOpen={isOpen} onClose={onClose}>
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 flex items-end gap-[3.25rem] z-10">
          <Link to="/incomes/create">
            <FloatingActionButton
              size="md"
              variant="solidGreen"
              title="Add Income"
            >
              <DownArrowIcon size="md" />
            </FloatingActionButton>
          </Link>
          <Link to="/transfers/create">
            <FloatingActionButton
              size="md"
              variant="solidMauve"
              containerClassName="mb-16"
              title="Add Transfer"
            >
              <RightLeftArrowIcon size="md" />
            </FloatingActionButton>
          </Link>
          <Link to="/expenses/create">
            <FloatingActionButton
              size="md"
              variant="solidRed"
              title="Add Expense"
            >
              <UpArrowIcon size="md" />
            </FloatingActionButton>
          </Link>
        </div>
      </ModalWithoutContent>
      <FloatingActionButton
        size="lg"
        onClick={onOpenClick}
        containerClassName="fixed bottom-24 left-1/2 -translate-x-1/2 z-20"
        className={`transition-all duration-300 ${
          isOpen ? "rotate-135" : "rotate-0"
        }`}
      >
        <PlusIcon size="lg" />
      </FloatingActionButton>
    </>
  );
};
