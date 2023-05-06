import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect } from "react";

import { useBackButtonContext } from "@shared/lib/back-button-context";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose(): void;
  actions?: ReactNode;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  actions,
}: ModalProps) => {
  const { register, unregister } = useBackButtonContext();

  useEffect(() => {
    if (isOpen) {
      register(onClose, 1000);
      return () => unregister(onClose);
    }
  }, [isOpen, onClose, register, unregister]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-color bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-10 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-center gap-6 bg-surface0 rounded p-5">
                <div className="flex flex-col gap-3">
                  <Dialog.Title as="h2" className="text-text text-h2">
                    {title}
                  </Dialog.Title>
                  <p className="text-body-xs text-subtext0">{description}</p>
                </div>

                {actions}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
