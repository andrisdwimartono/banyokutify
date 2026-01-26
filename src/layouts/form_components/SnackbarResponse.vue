<template>
  <v-snackbar
    :model-value="show"
    :timeout="2000"
    :color="type"
    @update:model-value="emit('update:show', $event)"
    location="top center"
  >
    {{ message }}

    <template #actions>
      <v-btn variant="text" @click="emit('update:show', false)">
        <v-icon icon="mdi-close"></v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
  type: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
</script>