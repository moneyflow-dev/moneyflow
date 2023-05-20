import { PreferencesSettingsAPI } from "./preferences-settings-api";
import { SettingsAPI } from "./settings-api.interface";

export { PreferencesSettingsAPI } from "./preferences-settings-api";

export const settingsApi: SettingsAPI = new PreferencesSettingsAPI();
