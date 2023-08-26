import {
  CreateCurrencyDTO,
  CurrenciesDTO,
  CurrencyDTO,
  CurrencyID,
  UpdateCurrencyDTO,
} from "./dtos";

export interface CurrenciesAPI {
  getCurrencies(): Promise<CurrenciesDTO>;
  setCurrencies(currencies: CurrenciesDTO): Promise<void>;
  createCurrency(currency: CreateCurrencyDTO): Promise<CurrencyDTO>;
  updateCurrency(
    id: CurrencyID,
    currency: UpdateCurrencyDTO,
  ): Promise<CurrencyDTO>;
  deleteCurrency(id: CurrencyID): Promise<void>;
}
