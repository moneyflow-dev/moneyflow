import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import { CurrenciesAPI } from "./currencies-api.interface";
import {
  CreateCurrencyDTO,
  CurrenciesDTO,
  CurrencyDTO,
  CurrencyID,
  UpdateCurrencyDTO,
} from "./dtos";

export class PreferencesCurrenciesAPI implements CurrenciesAPI {
  private async getState(): Promise<CurrenciesDTO> {
    const { value } = await Preferences.get({ key: "currencies" });
    if (value === null) {
      const state: CurrenciesDTO = {
        order: [],
        currencies: {},
      };
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: CurrenciesDTO) {
    await Preferences.set({
      key: "currencies",
      value: JSON.stringify(state),
    });
  }

  async getCurrencies(): Promise<CurrenciesDTO> {
    return await this.getState();
  }

  async createCurrency(currency: CreateCurrencyDTO): Promise<CurrencyDTO> {
    const state = await this.getState();
    const { order, currencies } = state;

    const id = uuidv4();
    const createdCurrency: CurrencyDTO = {
      ...currency,
      id,
      createdAt: Date.now(),
    };

    order.push(id);
    currencies[id] = createdCurrency;

    await this.setState(state);
    return createdCurrency;
  }

  async updateCurrency(
    id: CurrencyID,
    currency: UpdateCurrencyDTO,
  ): Promise<void> {
    const state = await this.getState();
    const { currencies } = state;

    const prevCurrency = currencies[id];
    const updatedCurrency: CurrencyDTO = {
      ...prevCurrency,
      ...currency,
    };

    currencies[id] = updatedCurrency;

    await this.setState(state);
  }

  async deleteCurrency(id: CurrencyID) {
    const state = await this.getState();
    const { order, currencies } = state;

    state.order = order.filter((currencyId) => currencyId !== id);
    delete currencies[id];

    await this.setState(state);
  }
}
