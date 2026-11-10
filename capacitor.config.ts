import type { CapacitorConfig } from '@capacitor/cli';
import { existsSync } from 'fs';
import { join } from 'path';

const isDev = process.env.CAP_ENV === 'dev';

// Native Google sign-in needs android/app/google-services.json from the Firebase console.
// Without that file, the native sign-in plugin crashes the app on launch, so we leave it out
// until the file is added. The app still runs; Google sign-in just shows a friendly error.
// After adding google-services.json, run `npm run android:sync` to switch it on.
const hasGoogleServices = existsSync(join(process.cwd(), 'android', 'app', 'google-services.json'));

const config: CapacitorConfig = {
  appId: 'com.seniorhomemods.app',
  appName: 'Senior Home Mods',
  webDir: 'out',
  server: isDev
    ? {
        url: 'http://10.0.2.2:3000',
        cleartext: true,
      }
    : undefined,
  ...(hasGoogleServices
    ? {}
    : { includePlugins: ['@capacitor/app', '@capacitor/network'] }),
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com'],
    },
  },
};

export default config;
