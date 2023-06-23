import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect } from "react";

import { useBackButtonContext } from "@shared/lib/back-button-context";

import { Divider } from "../dividers";
import { XmarkIcon } from "../icons";
import { PageLayout } from "../layouts";

interface ModalBottomSlideProps {
  title: string;
  isOpen: boolean;
  onClose(): void;
  children?: ReactNode;
  pageLayoutClassName?: string;
}

export const ModalBottomSlide = ({
  title,
  isOpen,
  onClose,
  children,
  pageLayoutClassName,
}: ModalBottomSlideProps) => {
  const { register, unregister } = useBackButtonContext();

  useEffect(() => {
    if (isOpen) {
      register(onClose, 1000);
      return () => unregister(onClose);
    }
  }, [isOpen, onClose, register, unregister]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Dialog.Panel className="fixed inset-0 min-h-full bg-base-color">
            <PageLayout className={pageLayoutClassName}>
              <div className="w-full flex flex-col gap-3">
                <div className="flex items-center gap-4 pe-3">
                  <span className="text-text text-xl font-bold flex-1">
                    {title}
                  </span>
                  <button onClick={onClose}>
                    <XmarkIcon
                      size="sm"
                      className="text-overlay1 active:text-overlay2 transition-colors"
                    />
                  </button>
                </div>
                <Divider />
              </div>
              {children}
            </PageLayout>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
