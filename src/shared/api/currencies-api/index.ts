import { CurrenciesAPI } from "./currencies-api.interface";
import { PreferencesCurrenciesAPI } from "./preferences-currencies-api";

export const currenciesApi: CurrenciesAPI = new PreferencesCurrenciesAPI();
