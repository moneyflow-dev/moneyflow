import { Browser } from "@capacitor/browser";
import { ReactNode } from "react";
import { NavigateOptions } from "react-router-dom";

export interface ExternalLinkProps extends NavigateOptions {
  href: string;
  className?: string;
  children?: ReactNode;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const onClick = async () => {
    await Browser.open({ url: href, toolbarColor: "#24273a" });
  };

  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
}
