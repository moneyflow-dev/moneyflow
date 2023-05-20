import { SettingsDTO } from "./dtos";

export interface SettingsAPI {
  getSettings(): Promise<SettingsDTO>;
  setSettings(settings: SettingsDTO): Promise<void>;
}
