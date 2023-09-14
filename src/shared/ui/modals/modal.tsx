import { ReactNode } from "react";

import { ModalWithoutContent } from "./modal-without-content";

interface ModalProps {
  isOpen: boolean;
  onClose(): void;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  actions,
}: ModalProps) {
  return (
    <ModalWithoutContent
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName="p-10"
    >
      <div className="flex flex-col items-center gap-6 bg-surface0 rounded p-5 overflow-y-auto text-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-text text-h2">{title}</h2>
          <p className="text-body-xs text-subtext0">{description}</p>
        </div>
        {actions}
      </div>
    </ModalWithoutContent>
  );
}
