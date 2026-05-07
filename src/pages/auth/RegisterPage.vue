<script setup lang="ts">
import { authService } from 'src/services';
import { useAuthStore } from 'src/stores';
import { useI18n } from 'vue-i18n';
import { AppBtn, AppForm, AppInput, AppPage, AppPasswordInput } from 'src/components';
import {
  type LocationQueryValue,
  type RouteLocationRaw,
  RouterLink,
  useRoute,
  useRouter,
} from 'vue-router';
import { useApiCall, useForm } from 'src/composables';
import { validation, type ValidationRule } from 'src/utils';

type RegisterFormData = {
  username: string;
  password: string;
  displayName: string;
};

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const labels = {
  inputs: {
    displayName: t('auth.registerPage.inputs.displayName'),
    password: t('auth.registerPage.inputs.password'),
    username: t('auth.registerPage.inputs.username'),
  },
  loginLink: t('auth.registerPage.loginLink'),
  pageTitle: t('auth.registerPage.pageTitle'),
  submitBtn: t('auth.registerPage.submitBtn'),
};

const { data: registerResponse, execute: apiCall } = useApiCall((data: RegisterFormData) =>
  authService.register(data),
);

const { formData, submitting, submit } = useForm<RegisterFormData>({
  initialValue: {
    username: '',
    password: '',
    displayName: '',
  },
  submit: async (data) => {
    await apiCall(data);

    if (registerResponse.value !== null) {
      authStore.setUserData(registerResponse.value);

      const redirect = route.query.redirect as LocationQueryValue;
      void router.push(redirect ?? '/');
    }
  },
});

const isUsernameAvailableRule: ValidationRule = async (username: string) => {
  const response = await authService.isUsernameAvailable(username);

  return (
    response.isAvailable ||
    t('validation.alreadyExists.short', { fieldName: labels.inputs.username })
  );
};

const usernameInputRules = [
  validation.required(),
  validation.length(3, 32),
  isUsernameAvailableRule,
];
const displayNameInputRules = [validation.required(), validation.length(2, 32)];
const passwordInputRules = [validation.required(), validation.maxLength(255)];

const loginRoute: RouteLocationRaw = { name: 'login', query: { redirect: route.query.redirect } };
</script>

<template>
  <AppPage centered-content>
    <AppForm class="column full-width max-width q-gutter-y-sm" @submit="submit">
      <h1 class="text-center text-h4 text-primary">{{ labels.pageTitle }}</h1>
      <AppInput
        id="input_username"
        v-model="formData.username"
        :debounce="1000"
        :label="labels.inputs.username"
        name="username"
        :rules="usernameInputRules"
      />
      <AppInput
        id="input_displayName"
        v-model="formData.displayName"
        :label="labels.inputs.displayName"
        name="displayName"
        :rules="displayNameInputRules"
      />
      <AppPasswordInput
        id="input_password"
        v-model="formData.password"
        :label="labels.inputs.password"
        name="password"
        :rules="passwordInputRules"
      />
      <AppBtn :label="labels.submitBtn" :loading="submitting" type="submit" />

      <RouterLink class="q-mt-md text-center" :to="loginRoute">
        {{ labels.loginLink }}
      </RouterLink>
    </AppForm>
  </AppPage>
</template>

<style scoped lang="scss">
.max-width {
  max-width: $breakpoint-xs;
}
</style>
