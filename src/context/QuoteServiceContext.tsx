"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceFormValue } from "@/lib/constants/services";

type QuoteServiceContextValue = {
  presetService: ServiceFormValue | null;
  setPresetService: (v: ServiceFormValue | null) => void;
  scrollToQuote: () => void;
};

const QuoteServiceContext = createContext<QuoteServiceContextValue | null>(
  null,
);

export function QuoteServiceProvider({ children }: { children: ReactNode }) {
  const [presetService, setPresetService] = useState<ServiceFormValue | null>(
    null,
  );

  const scrollToQuote = useCallback(() => {
    const el = document.getElementById("quote");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({
      presetService,
      setPresetService,
      scrollToQuote,
    }),
    [presetService, scrollToQuote],
  );

  return (
    <QuoteServiceContext.Provider value={value}>
      {children}
    </QuoteServiceContext.Provider>
  );
}

export function useQuoteService() {
  const ctx = useContext(QuoteServiceContext);
  if (!ctx) {
    throw new Error("useQuoteService must be used within QuoteServiceProvider");
  }
  return ctx;
}
