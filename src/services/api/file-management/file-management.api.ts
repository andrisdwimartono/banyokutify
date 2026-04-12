import api from '@/services/api/axios'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { FileResponse } from '@/types/file-management/file.response'

export const fileManagementApi = {
  upload(file: File, subDirectory?: string) {
    const formData = new FormData()
    formData.append('file', file)
    if (subDirectory) {
      formData.append('subDirectory', subDirectory)
    }
    return api.post<ApiResponse<FileResponse>>('/file-management', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getById(id: string) {
    return api.get<ApiResponse<FileResponse>>(`/file-management/${id}`)
  },
  getDownload(id: string) {
    return api.get<ApiResponse<Blob>>(`/file-management/${id}/download`)
  },
  getFileUrl(id: string) {
    return `${import.meta.env.VITE_API_URL}/file-management/${id}/download`
  }
}
