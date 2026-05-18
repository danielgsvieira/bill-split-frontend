<script setup lang="ts">
import { authService } from 'src/services';
import { computed } from 'vue';
import { useAuthStore } from 'src/stores';
import { useI18n } from 'vue-i18n';
import { validation } from 'src/utils';
import { AppBtn, AppForm, AppInput, AppPage, AppPasswordInput } from 'src/components';
import {
  type LocationQueryValue,
  type RouteLocationRaw,
  RouterLink,
  useRoute,
  useRouter,
} from 'vue-router';
import { useApiCall, useForm } from 'src/composables';

type LoginFormData = {
  username: string;
  password: string;
};

const i18n = useI18n();
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const labels = {
  inputs: {
    password: i18n.t('auth.loginPage.inputs.password'),
    username: i18n.t('auth.loginPage.inputs.username'),
  },
  invalidCredentialsMessage: i18n.t('auth.loginPage.invalidCredentialsMessage'),
  pageTitle: i18n.t('auth.loginPage.pageTitle'),
  registerLink: i18n.t('auth.loginPage.registerLink'),
  submitBtn: i18n.t('auth.loginPage.submitBtn'),
};

const {
  data: response,
  error: responseError,
  execute: apiCall,
} = useApiCall((data: LoginFormData) => authService.login(data), {
  showToast: { unauthorized: false },
});

const { formData, submitting, submit } = useForm<LoginFormData>({
  initialValue: {
    username: '',
    password: '',
  },
  submit: async (data) => {
    await apiCall(data);

    if (response.value !== null) {
      authStore.setUserData(response.value);

      const redirect = route.query.redirect as LocationQueryValue;
      void router.push(redirect ?? '/');
    }
  },
});

const inputRules = [validation.required()];

const invalidCredentialsMessage = computed(() => {
  return responseError.value?.isUnauthorized ? labels.invalidCredentialsMessage : null;
});

const registerRoute: RouteLocationRaw = {
  name: 'register',
  query: { redirect: route.query.redirect },
};
</script>

<template>
  <AppPage centered-content>
    <AppForm class="column full-width max-width q-gutter-y-sm" @submit="submit">
      <h1 class="text-center text-h4 text-primary">{{ labels.pageTitle }}</h1>
      <AppInput
        id="input_username"
        v-model="formData.username"
        :label="labels.inputs.username"
        name="username"
        :rules="inputRules"
      />
      <AppPasswordInput
        id="input_password"
        v-model="formData.password"
        :label="labels.inputs.password"
        name="password"
        :rules="inputRules"
      />
      <span v-if="invalidCredentialsMessage !== null" class="text-body2 text-center text-negative">
        {{ invalidCredentialsMessage }}
      </span>
      <AppBtn :label="labels.submitBtn" :loading="submitting" type="submit" />
      <div class="q-mt-md text-center">
        <RouterLink :to="registerRoute">
          {{ labels.registerLink }}
        </RouterLink>
      </div>
    </AppForm>
  </AppPage>
</template>

<style scoped lang="scss">
.max-width {
  max-width: $breakpoint-xs;
}
</style>
