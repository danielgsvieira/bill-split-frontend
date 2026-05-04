import type { Promiseable } from 'src/utils';
import { ref } from 'vue';

type FormValidationErrors<T> = { [K in keyof T]?: string };
type UseFormOptions<T> = {
  initialValue: T;
  submit: (data: T) => Promiseable<void>;
  validate?: (data: T) => Promiseable<FormValidationErrors<T>>;
};

function useForm<T>(options: UseFormOptions<T>) {
  const formData = ref(options.initialValue);
  const submitting = ref(false);

  async function submit() {
    if (submitting.value) {
      return;
    }

    submitting.value = true;

    await options.submit(formData.value);

    submitting.value = false;
  }

  return {
    formData,
    submitting,
    submit,
  };
}

export { useForm };
