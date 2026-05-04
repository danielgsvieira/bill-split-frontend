<script setup lang="ts">
import AppBtn from './AppBtn.vue';
import { AppDateFormat } from 'src/consts';
import AppIcon from './AppIcon.vue';
import { DateTime } from 'luxon';
import { isNullOrUndefined } from 'src/utils';
import { useI18n } from 'vue-i18n';
import AppInput, { type AppInputProps } from './AppInput.vue';
import { computed, useTemplateRef } from 'vue';
import { QDate, QPopupProxy, ClosePopup as vClosePopup } from 'quasar';

type AppDatePickerModelType = DateTime | null;
type AppDatePickerProps = Omit<AppInputProps, 'type'>;

const props = defineProps<AppDatePickerProps>();
const model = defineModel<AppDatePickerModelType>();

const { t } = useI18n();

const popupProxyRef = useTemplateRef<InstanceType<typeof QPopupProxy>>('popup-proxy');

const modelStrValue = computed({
  get: () => {
    if (isNullOrUndefined(model.value)) {
      return null;
    }

    return model.value.toFormat(AppDateFormat);
  },
  set: (value: string | null) => {
    if (value === null) {
      model.value = null;
      return;
    }

    const dateValue = DateTime.fromFormat(value, AppDateFormat);
    model.value = dateValue.isValid ? dateValue : null;

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
              <AppBtn v-close-popup flat :label="t('general.close')" type="button" />
            </div>
          </QDate>
        </QPopupProxy>
      </AppIcon>
    </template>
  </AppInput>
</template>
