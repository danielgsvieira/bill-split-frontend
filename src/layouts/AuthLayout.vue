<script setup lang="ts">
import { RouterView } from 'vue-router';
import { QLayout, QPageContainer } from 'quasar';
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>
