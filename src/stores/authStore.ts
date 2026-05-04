import { User } from 'src/models/User';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import {
  getAuthUserData,
  isUserAuthenticated,
  type StorageAuthUserData,
  storeAuthUserData,
} from 'src/utils';

const useAuthStore = defineStore('authStore', () => {
  const authUserData = ref(getAuthUserData());
  const isUserAthenticated = ref(false);

  watch(authUserData, (newValue) => {
    storeAuthUserData(newValue);
    isUserAthenticated.value = isUserAuthenticated();
  });

  const authUser = computed(() => {
    return authUserData.value !== null ? new User(authUserData.value.user) : null;
  });

  function setUserData(userData: StorageAuthUserData) {
    authUserData.value = userData;
  }

  function logout() {
    authUserData.value = null;
  }

  return {
    authUser,
    isUserAthenticated,
    setUserData,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export { useAuthStore };
