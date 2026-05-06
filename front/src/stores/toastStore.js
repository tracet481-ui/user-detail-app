import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function showToast(message, type = 'success') {
    const id = Date.now()

    toasts.value.push({
      id,
      message,
      type,
    })

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  function showSuccess(message) {
    showToast(message, 'success')
  }

  function showError(message) {
    showToast(message, 'error')
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    removeToast,
  }
})