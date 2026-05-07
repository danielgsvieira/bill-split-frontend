import { createI18n } from 'vue-i18n';
import { defineBoot } from '#q-app/wrappers';
import { datetimeFormats, messages, numberFormats } from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'pt-BR' as the master schema for the resource
export type MessageSchema = (typeof messages)['pt-BR'];

export type NumberFormat = (typeof numberFormats)['pt-BR'];

export type DateFormat = (typeof datetimeFormats)['pt-BR'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
// Disable the @typescript-eslint/consistent-type-definitions rule to make use of declaration merging
/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat extends DateFormat {}

  // define the number format schema
  export interface DefineNumberFormat extends NumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions */

const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
  locale: 'pt-BR',
  legacy: false,
  messages,
  numberFormats,
  datetimeFormats,
});

export default defineBoot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
