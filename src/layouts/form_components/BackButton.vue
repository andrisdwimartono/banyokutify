<template>
  <v-btn
    color="primary"
    type="button"
    elevation="0"
    class="float-left"
    @click="back"
  >
    {{ t('back') }}
  </v-btn>
</template>


<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const emit = defineEmits(['back'])
    const url = defineProps<{ url: string }>()
    
    const back = () => {
        router.push({ path: url.url })
    }
</script>

<style scoped></style>