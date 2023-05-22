import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect } from "react";

import { useBackButtonContext } from "@shared/lib/back-button-context";

interface ModalWithoutContentProps {
  isOpen: boolean;
  onClose(): void;
  children?: ReactNode;
}

export const ModalWithoutContent = ({
  isOpen,
  onClose,
  children,
}: ModalWithoutContentProps) => {
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

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {children}
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
