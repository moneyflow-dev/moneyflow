import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "cash.wallet.watch",
  appName: "Wallet Watch",
  webDir: "dist",
  server: {
    androidScheme: "https",
    // hostname: "192.168.1.123",
    // cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    SystemBars: {
      insetsHandling: "disable",
    },
    EdgeToEdge: {
      navigationBarColor: "#24273A",
      statusBarColor: "#24273A",
    },
  },
};

export default config;
