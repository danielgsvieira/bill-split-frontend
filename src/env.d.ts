// Disable the @typescript-eslint/consistent-type-definitions rule to make use of declaration merging
/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
