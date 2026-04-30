<template>
  <div class="flex min-h-screen bg-slate-100">
    <aside class="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white p-5">
      <RouterLink to="/" class="mb-8 block text-sm font-semibold text-slate-600">
        ← Go Home
      </RouterLink>

      <div class="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <!-- <h2 class="font-bold text-slate-900">
          {{ userStore.selectedUser?.name || 'User' }}
        </h2>
        <p class="text-sm text-slate-500">
          @{{ userStore.selectedUser?.username || 'username' }}
        </p> -->
      </div>


    </aside>

    <main class="ml-64 min-h-screen flex-1 p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const userStore = useUserStore()

async function loadUserDetail() {
  if (!route.params.id) return
  await userStore.fetchUserDetail(route.params.id)
}

onMounted(loadUserDetail)

watch(
  () => route.params.id,
  () => loadUserDetail()
)
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}
.nav-link:hover {
  background: #f1f5f9;
}
.nav-active {
  background: #4f46e5;
  color: white;
}
</style>