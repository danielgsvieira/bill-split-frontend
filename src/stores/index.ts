import { createPinia } from 'pinia';
import { defineStore } from '#q-app/wrappers';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
// Disable the @typescript-eslint/consistent-type-definitions rule to make use of declaration merging
/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    // add your custom properties here, if any
  }
}
/* eslint-enable @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions */

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = defineStore((/* { ssrContext } */) => {
  const pinia = createPinia();

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia;
});

export default store;

export * from './authStore';
