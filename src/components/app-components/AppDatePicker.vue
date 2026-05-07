<script setup lang="ts">
import AppBtn from './AppBtn.vue';
import AppIcon from './AppIcon.vue';
import { isNullOrUndefined } from 'src/utils';
import { useI18n } from 'vue-i18n';
import AppInput, { type AppInputProps } from './AppInput.vue';
import { computed, useTemplateRef } from 'vue';
import { QDate, QPopupProxy, ClosePopup as vClosePopup } from 'quasar';

type AppDatePickerModelType = Date | null;
type AppDatePickerProps = Omit<AppInputProps, 'type'>;

const props = defineProps<AppDatePickerProps>();
const model = defineModel<AppDatePickerModelType>();

const i18n = useI18n();

const popupProxyRef = useTemplateRef<InstanceType<typeof QPopupProxy>>('popup-proxy');

const modelStrValue = computed({
  get: () => {
    if (isNullOrUndefined(model.value)) {
      return null;
    }

    return i18n.d(model.value, 'short');
  },
  set: (value: string | null) => {
    if (value === null) {
      model.value = null;
      return;
    }

    const [day, month, year] = value.split('/').map(Number) as [number, number, number];
    model.value = new Date(year, month - 1, day);

    popupProxyRef.value?.hide();
  },
});
</script>

<template>
  <AppInput v-bind="props" v-model="modelStrValue" mask="##/##/####" @click="popupProxyRef?.show()">
    <template #append>
      <AppIcon class="cursor-pointer" name="event">
        <QPopupProxy ref="popup-proxy">
          <QDate v-model="modelStrValue" mask="DD/MM/YYYY" minimal>
            <div class="items-center justify-end row">
              <AppBtn v-close-popup flat :label="i18n.t('general.close')" type="button" />
            </div>
          </QDate>
        </QPopupProxy>
      </AppIcon>
    </template>
  </AppInput>
</template>
