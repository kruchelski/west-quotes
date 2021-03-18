import dotenv from 'dotenv';
import project from './package.json';

const config = dotenv.config();

if (config.error) {
  throw config.error;
}

export default {
  expo: {
    name: 'West Quotes',
    slug: project.name,
    version: project.version,
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    splash: {
      backgroundColor: '#ffffff',
      image: './src/assets/images/logo.png',
      resizeMode: 'contain',
    },
    extra: {
      ...process.env,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './src/assets/images/favicon.png',
    },
  },
};
