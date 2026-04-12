export interface FileResponse {
  id: string
  fileName: string
  path: string
  url: string | null
  mimeType: string
  size: number
  status: number
  visibility: number
  entityType: string | null
  entityId: string | null
  fileUrl: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}
