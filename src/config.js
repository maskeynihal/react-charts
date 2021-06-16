const env = import.meta.env;

const config = {
  ssr: env.SSR,
  snowpackPublicEnableFeature: env.SNOWPACK_PUBLIC_ENABLE_FEATURE,
  mode: env.MODE,
  nodeEnv: env.NODE_ENV,
  appVersion: env.SNOWPACK_PUBLIC_APP_VERSION,
};

export default config;
