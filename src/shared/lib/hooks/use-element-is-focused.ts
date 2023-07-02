import { useEffect, useState } from "react";

export function useElementIsFocused<T extends HTMLElement>(
  ref: React.RefObject<T>,
): boolean {
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const onFocusIn = () => setIsFocused(true);
    const onFocusOut = () => setIsFocused(false);
    element?.addEventListener("focusin", onFocusIn);
    element?.addEventListener("focusout", onFocusOut);
    return () => {
      element?.removeEventListener("focusin", onFocusIn);
      element?.removeEventListener("focusout", onFocusOut);
    };
  }, [ref]);
  return isFocused;
}
