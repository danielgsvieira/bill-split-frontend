import { Notify, type QNotifyCreateOptions } from 'quasar';

function useToast() {
  /**
   * Expose the Notify.create function. Docs: https://quasar.dev/quasar-plugins/notify
   */
  function customToast(options: QNotifyCreateOptions | string) {
    Notify.create(options);
  }

  function positive(message: string) {
    customToast({
      type: 'positive',
      message,
    });
  }

  function info(message: string) {
    customToast({
      type: 'info',
      message,
    });
  }

  function negative(message: string) {
    customToast({
      type: 'negative',
      message,
    });
  }

  function warning(message: string) {
    customToast({
      type: 'warning',
      message,
    });
  }

  return {
    customToast,
    positive,
    info,
    negative,
    warning,
  };
}

export { useToast };
