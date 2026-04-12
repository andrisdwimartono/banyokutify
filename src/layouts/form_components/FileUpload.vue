<template>
  <div class="file-upload-wrapper">
    <v-file-upload
      v-model="localFile"
      :title="label || t('dragAndDropFiles')"
      :subtitle="subtitle || ''"
      :accept="accept"
      :loading="uploading"
      show-size
      clearable
      scrim="primary"
      :rules="rules"
      @update:model-value="onFileChange"
      @click:clear="onClear"
      :error-messages="errorMsg"
    ></v-file-upload>

    <div v-if="previewUrl" class="mt-2">
      <v-img
        v-if="isImage"
        :src="previewUrl"
        max-width="200"
        max-height="200"
        class="bg-grey-lighten-2 rounded"
      ></v-img>
      <div v-else class="text-caption d-flex align-center">
        <v-icon icon="mdi-file-document-outline" class="mr-2"></v-icon>
        <a :href="previewUrl" target="_blank">{{ fileName }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { fileManagementApi } from '@/services/api/file-management/file-management.api'
import api from '@/services/api/axios'
import { useSnackbarStore } from '@/stores/snackbar.store'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  label?: string
  subtitle?: string
  accept?: string
  subDirectory?: string
  rules?: any[]
}>()

const modelValue = defineModel<string | null>()

const snackbar = useSnackbarStore()
const { t } = useI18n()

const localFile = ref<File | File[] | undefined>()
const uploading = ref(false)
const previewUrl = ref<string | null>(null)
const isImage = ref(false)
const fileName = ref<string>('')
const errorMsg = ref<string>('')

const getFullUrl = (url: string) => {
  if (url.startsWith('http')) return url
  return `${import.meta.env.VITE_API_URL}${url}`
}

const loadFileDetails = async (id: string) => {
  if (!id) return
  try {
    const res = await fileManagementApi.getById(id)
    const data = res.data.data
    isImage.value = data.mimeType ? data.mimeType.startsWith('image/') : false
    previewUrl.value = getFullUrl(data.fileUrl)
    fileName.value = data.fileName

    // Pre-fill VFileUpload by fetching the blob locally
    try {
      const blobRes = await api.get(`/file-management/${id}/download`, { responseType: 'blob' })
      const pseudoFile = new File([blobRes.data], data.fileName, { type: data.mimeType })
      ;(pseudoFile as any).isPseudo = true
      localFile.value = pseudoFile
    } catch (err) {
      console.error('Failed to load blob for preview', err)
    }
  } catch (err: any) {
    console.error('Failed to load file details', err)
  }
}

onMounted(() => {
  if (modelValue.value) {
    loadFileDetails(modelValue.value)
  }
})

watch(modelValue, (newVal) => {
  if (!newVal) {
    localFile.value = undefined
    previewUrl.value = null
    isImage.value = false
    fileName.value = ''
  } else if (!previewUrl.value) { 
    loadFileDetails(newVal)
  }
})

const onFileChange = async (val: File | File[] | null) => {
  errorMsg.value = ''
  if (!val) {
    onClear()
    return
  }
  
  const file = Array.isArray(val) ? val[0] : val
  if (!(file instanceof File)) return
  if ((file as any).isPseudo) return
  
  uploading.value = true
  try {
    const res = await fileManagementApi.upload(file, props.subDirectory)
    const data = res.data.data
    modelValue.value = data.id
    isImage.value = data.mimeType ? data.mimeType.startsWith('image/') : file.type.startsWith('image/')
    previewUrl.value = getFullUrl(data.fileUrl)
    fileName.value = data.fileName
    snackbar.show('Success', t('FILE_UPLOADED') || 'File uploaded successfully', 'success')
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || 'Upload failed'
    snackbar.error(errorMsg.value)
    localFile.value = undefined
  } finally {
    uploading.value = false
  }
}

const onClear = () => {
  modelValue.value = null
  previewUrl.value = null
  isImage.value = false
  fileName.value = ''
}
</script>
