<script setup lang="ts">
import { AppIcon } from 'src/components';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  QAvatar,
  QItem,
  QItemSection,
  QList,
  QMenu,
  ClosePopup as vClosePopup,
  Ripple as vRipple,
} from 'quasar';

const i18n = useI18n();
const router = useRouter();

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

function handleLogout() {
  authStore.logout();
  void router.push({ name: 'login' });
}

const userInitial = computed(() => {
  const displayName = authUser.value?.displayName ?? 'user';

  return displayName.charAt(0).toLocaleUpperCase();
});

const menuOffset = [0, 2];
</script>

<template>
  <QAvatar class="cursor-pointer" color="blue-grey-2 text-primary">
    {{ userInitial }}
    <QMenu anchor="bottom right" class="q-mt-xl" :offset="menuOffset" self="top right">
      <QList>
        <QItem v-close-popup v-ripple clickable @click="handleLogout">
          <QItemSection side>
            <AppIcon name="logout" />
          </QItemSection>
          <QItemSection>{{ i18n.t('general.logout') }}</QItemSection>
        </QItem>
      </QList>
    </QMenu>
  </QAvatar>
</template>
