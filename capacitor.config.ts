import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.astsu.moneyflow",
  appName: "Money Flow",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.14:5173",
    cleartext: true,
  },
};

export default config;
