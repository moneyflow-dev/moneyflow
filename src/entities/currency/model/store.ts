import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { currenciesApi } from "@shared/api/currencies-api";

import {
  CreateCurrency,
  Currencies,
  Currency,
  CurrencyID,
  UpdateCurrency,
} from "./models";

interface CurrenciesState {
  currencies: Currencies;
  fetchCurrencies(): Promise<void>;
  createCurrency(currency: CreateCurrency): Promise<void>;
  updateCurrency(id: CurrencyID, currency: UpdateCurrency): Promise<void>;
  deleteCurrency(id: CurrencyID): Promise<void>;
  getCurrency(id: CurrencyID): Currency;
}

export const useCurrenciesStore = create<CurrenciesState>()(
  devtools((set, get) => ({
    currencies: { order: [], currencies: {} },
    async fetchCurrencies() {
      const currencies = await currenciesApi.getCurrencies();
      set(() => ({
        currencies,
      }));
    },
    async createCurrency(currency) {
      const createdCurrency = await currenciesApi.createCurrency(currency);
      set((state) => ({
        currencies: {
          order: [...state.currencies.order, createdCurrency.id],
          currencies: {
            ...state.currencies.currencies,
            [createdCurrency.id]: createdCurrency,
          },
        },
      }));
    },
    async updateCurrency(id, currency) {
      await currenciesApi.updateCurrency(id, currency);
      set((state) => ({
        currencies: {
          ...state.currencies,
          currencies: {
            ...state.currencies.currencies,
            [id]: { id, ...currency },
          },
        },
      }));
    },
    async deleteCurrency(id) {
      await currenciesApi.deleteCurrency(id);
      set((state) => ({
        currencies: {
          order: state.currencies.order.filter(
            (currencyId) => currencyId !== id,
          ),
          currencies: Object.fromEntries(
            Object.entries(state.currencies.currencies).filter(
              ([currencyId]) => currencyId !== id,
            ),
          ),
        },
      }));
    },
    getCurrency(id) {
      return get().currencies.currencies[id];
    },
  })),
);
