import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useOutsideClick } from "@shared/lib/hooks";

interface AutocompleteOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function AutocompleteOptions({
  isOpen,
  onClose,
  className,
  children,
}: AutocompleteOptionsProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="transition-opacity"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={ref}
        className={twMerge(
          "absolute flex flex-col w-full rounded py-1.25 mt-1.5 bg-surface0 overflow-y-auto",
          isOpen ? "outline outline-1 -outline-offset-1 outline-overlay0" : "",
          className,
        )}
      >
        {children}
      </div>
    </Transition>
  );
}
