<script setup>
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast-container">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast"
      :class="toast.type"
    >
      <span class="toast-icon">
        {{ toast.type === 'success' ? '✓' : '!' }}
      </span>

      <span class="toast-message">
        {{ toast.message }}
      </span>

      <button
        class="toast-close"
        @click="toastStore.removeToast(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast {
  min-width: 280px;
  max-width: 360px;
  padding: 14px 16px;
  border-radius: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
  animation: slideIn 0.25s ease;
}

.toast.success {
  background: #16a34a;
}

.toast.error {
  background: #dc2626;
}

.toast-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.toast-close {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(24px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>