import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useBackButtonContext } from "@shared/lib/back-button-context";

interface ModalWithoutContentProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  overlayClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
}

export function ModalWithoutContent({
  isOpen,
  onClose,
  children,
  overlayClassName,
  wrapperClassName,
  contentClassName,
}: ModalWithoutContentProps) {
  const { register, unregister } = useBackButtonContext();

  useEffect(() => {
    if (isOpen) {
      register(onClose, 1000);
      return () => unregister(onClose);
    }
  }, [isOpen, onClose, register, unregister]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={twMerge(
              "fixed inset-0 bg-base-color bg-opacity-75",
              overlayClassName,
            )}
          ></div>
        </Transition.Child>
        <div
          className={twMerge(
            "fixed inset-0 min-h-full flex items-center justify-center overflow-y-auto z-20",
            wrapperClassName,
          )}
          onClick={onClose}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className={contentClassName}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
}
