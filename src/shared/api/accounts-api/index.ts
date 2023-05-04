import { AccountsAPI } from "./accounts-api.interface";
import { PreferencesAccountsAPI } from "./preferences-accounts-api";

export { type AccountsAPI } from "./accounts-api.interface";

export const accountsApi: AccountsAPI = new PreferencesAccountsAPI();
