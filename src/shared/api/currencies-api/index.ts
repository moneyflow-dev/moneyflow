import { CurrenciesAPI } from "./currencies-api.interface";
import { PreferencesCurrenciesAPI } from "./preferences-currencies-api";

export type { CurrencyID, CurrenciesDTO } from "./dtos";

export const currenciesApi: CurrenciesAPI = new PreferencesCurrenciesAPI();
