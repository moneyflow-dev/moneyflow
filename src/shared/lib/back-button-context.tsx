import { App as AppPlugin } from "@capacitor/app";
import { ReactNode, createContext, useContext, useEffect, useRef } from "react";

export type BackButtonHandler = (event: { canGoBack: boolean }) => void;

interface BackButtonListener {
  handler: BackButtonHandler;
  priority: number;
}

interface BackButtonContextState {
  register(handler: BackButtonHandler, priority: number): void;
  unregister(handler: BackButtonHandler): void;
}

const BackButtonContext = createContext<BackButtonContextState | null>(null);

interface BackButtonContextProviderProps {
  children: ReactNode;
}

export const BackButtonContextProvider = ({
  children,
}: BackButtonContextProviderProps) => {
  const listenersRef = useRef<BackButtonListener[]>([]);

  const contextValue: BackButtonContextState = {
    register(handler, priority) {
      listenersRef.current.push({ handler, priority });
      listenersRef.current.sort((a, b) => a.priority - b.priority);
    },
    unregister(handler) {
      listenersRef.current = listenersRef.current.filter(
        (listener) => listener.handler !== handler,
      );
    },
  };

  useEffect(() => {
    AppPlugin.addListener("backButton", ({ canGoBack }) => {
      const listeners = listenersRef.current;

      const length = listeners.length;
      if (length) {
        const lastListener = listeners[length - 1];
        const listenersWithSamePriority = listeners.filter(
          (listener) => listener.priority === lastListener.priority,
        );
        for (const listener of listenersWithSamePriority) {
          listener.handler({ canGoBack });
        }
      }
    });
    return () => {
      AppPlugin.removeAllListeners();
    };
  }, []);

  return (
    <BackButtonContext.Provider value={contextValue}>
      {children}
    </BackButtonContext.Provider>
  );
};

export const useBackButtonContext = (): BackButtonContextState => {
  const value = useContext(BackButtonContext);
  if (value === null) {
    throw new Error("Using BackButtonContext outside provider");
  }
  return value;
};
