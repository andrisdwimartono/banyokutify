import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    visible: false,
    title: 'Notice',
    message: '',
    color: 'success',
    timeout: 3000,
  }),

  actions: {
    show(title: string = 'Notice', message: string, color = 'success', timeout = 3000) {
      this.title = title
      this.message = message
      this.color = color
      this.timeout = timeout
      this.visible = true
    },

    error(message: string) {
      this.show('Error', message, 'error')
    }
  }
})