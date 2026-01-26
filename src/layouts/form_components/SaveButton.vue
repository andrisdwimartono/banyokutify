<template>
  <v-btn
    color="primary"
    type="submit"
    elevation="0"
    class="float-right"
    :loading="loading"
  >
    {{ loading?t('saving') : t('save') }}
  </v-btn>
</template>


<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()

    const loading = defineModel<boolean>('loading')
    // emit submit event
    const emit = defineEmits(['submit'])
    
    const submit = () => {
        loading.value = true
        emit('submit')
        setTimeout(() => {
            loading.value = false
        }, 1000)
    }
</script>

<style scoped></style>