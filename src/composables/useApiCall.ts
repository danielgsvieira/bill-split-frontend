import { i18n as i18nInstance } from 'src/boot/i18n';
import { useAuthStore } from 'src/stores';
import { useToast } from './useToast';
import { ApiError, ApiValidationError } from 'src/utils';
import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type AssyncCall<T, Args extends unknown[]> = (...args: Args) => Promise<T>;
type ShowToastOptions = {
  forbiddenAction: boolean;
  notFound: boolean;
  unauthorized: boolean;
  validation: boolean;
};
type UseApiCallOptions = {
  showToast: Partial<ShowToastOptions> | boolean;
};

function useApiCall<T, Args extends unknown[]>(
  asyncCall: AssyncCall<T, Args>,
  options: UseApiCallOptions = { showToast: true },
) {
  const router = useRouter();
  const route = useRoute();
  const i18n = i18nInstance.global;
  const toast = useToast();
  const authStore = useAuthStore();

  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<ApiError | null>(null);
  const loading = ref(false);

  function printApiErrorToast(apiError: ApiError) {
    if (options.showToast === false) {
      return;
    }

    const showToastOptions: ShowToastOptions =
      options.showToast === true
        ? {
            forbiddenAction: options.showToast,
            notFound: options.showToast,
            unauthorized: options.showToast,
            validation: options.showToast,
          }
        : {
            forbiddenAction: options.showToast.forbiddenAction ?? true,
            notFound: options.showToast.notFound ?? true,
            unauthorized: options.showToast.unauthorized ?? true,
            validation: options.showToast.validation ?? true,
          };

    if (apiError instanceof ApiValidationError) {
      if (showToastOptions.validation) {
        toast.negative(i18n.t('apiError.validationFailed'));
      }
    } else if (apiError.isForbiddenAction) {
      if (showToastOptions.forbiddenAction) {
        toast.negative(i18n.t('apiError.forbiddenAction'));
      }
    } else if (apiError.isNotFound) {
      if (showToastOptions.notFound) {
        toast.negative(i18n.t('apiError.notFound'));
      }
    } else if (apiError.isUnauthorized) {
      if (showToastOptions.unauthorized) {
        toast.negative(i18n.t('apiError.unauthorized'));
      }
    } else {
      toast.negative(i18n.t('apiError.unknownError'));
    }
  }

  async function execute(...args: Args) {
    loading.value = true;
    error.value = null;

    try {
      const result = await asyncCall(...args);

      data.value = result;
    } catch (err) {
      const apiError = err instanceof ApiError ? err : ApiError.createUnknownError(err);

      printApiErrorToast(apiError);

      if (apiError.isUnknownError) {
        // eslint-disable-next-line no-console
        console.log({ error: apiError.capturedError });
      }

      if (apiError.isUnauthorized) {
        authStore.logout();
        void router.push({ name: 'login', query: { redirect: route.path } });
      }

      error.value = apiError;
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, execute };
}

export { useApiCall };
