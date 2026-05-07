import { i18n as i18nInstance } from 'src/boot/i18n';
import { Dialog, type QDialogOptions } from 'quasar';

function useDialog() {
  const i18n = i18nInstance.global;

  /**
   * Expose the Dialog.create function. Docs: https://quasar.dev/quasar-plugins/dialog/
   */
  function customDialog(options: QDialogOptions) {
    return Dialog.create(options);
  }

  function confirm(options: {
    title: string;
    message: string;
    confirmBtn?: { label?: string };
    cancelBtn?: { label?: string };
  }) {
    return customDialog({
      title: options.title,
      message: options.message,
      cancel: {
        color: 'grey-8',
        flat: true,
        label: options.cancelBtn?.label ?? i18n.t('general.no'),
        noCaps: true,
      },
      ok: {
        color: 'primary',
        label: options.confirmBtn?.label ?? i18n.t('general.yes'),
        noCaps: true,
      },
    });
  }

  return { confirm };
}

export { useDialog };
