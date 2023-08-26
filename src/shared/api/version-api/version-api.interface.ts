import { DBVersion, DeviceDBVersion } from "./dtos";

export interface VersionAPI {
  getVersion(): Promise<DeviceDBVersion>;
  setVersion(version: DBVersion): Promise<void>;
}
