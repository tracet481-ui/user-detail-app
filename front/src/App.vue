<template>
  <div class="app-layout">
    <AppSidebar />

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
}

.main-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>