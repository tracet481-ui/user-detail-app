<template>
  <div class="user-detail-page">
    <div v-if="userStore.loading" class="loading-card">
      Loading user detail...
    </div>

    <div v-else-if="userStore.error" class="error-card">
      {{ userStore.error }}
    </div>

    <div v-else-if="userStore.selectedUser" class="user-detail-card">
      <div class="user-header">
        <div class="avatar">
          {{ userStore.selectedUser.name?.charAt(0) }}
        </div>

        <div>
          <h1>{{ userStore.selectedUser.name }}</h1>
          <p>@{{ userStore.selectedUser.username }}</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box">
          <span>Email</span>
          <strong>{{ userStore.selectedUser.email }}</strong>
        </div>

        <div class="info-box">
          <span>Company</span>
          <strong>
            {{ userStore.selectedUser.company?.name || 'Company yok' }}
          </strong>
        </div>
      </div>
    </div>

    <div v-else class="empty-card">
      User bulunamadı.
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const userStore = useUserStore()

async function loadUserDetail() {
  await userStore.fetchUserDetail(route.params.id)
}

onMounted(loadUserDetail)

watch(
  () => route.params.id,
  async () => {
    await loadUserDetail()
  }
)
</script>

<style scoped>
.user-detail-page {
  width: 100%;
  height: 100%;
}

.user-detail-card,
.loading-card,
.error-card,
.empty-card {
  background: #fff;
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: #eeeafe;
  color: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
}

.user-header h1 {
  margin: 0;
  color: #111827;
  font-size: 30px;
}

.user-header p {
  margin: 6px 0 0;
  color: #64748b;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.info-box {
  background: #f8fafc;
  border-radius: 18px;
  padding: 18px;
}

.info-box span {
  display: block;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 8px;
}

.info-box strong {
  color: #111827;
  font-size: 16px;
}

.error-card {
  background: #fff1f2;
  color: #dc2626;
  border: 1px solid #fecdd3;
}

.empty-card,
.loading-card {
  color: #64748b;
}
</style>