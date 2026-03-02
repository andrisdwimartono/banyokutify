<template>
  <v-btn
    color="primary"
    elevation="0"
    variant="tonal"
    size="small"
    class="text-none"
    @click="emit('add')"
  >
    <v-icon start icon="mdi-plus"></v-icon>
    {{ t('addRow') }}
  </v-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['add'])
</script>

<style scoped></style>
