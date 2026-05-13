<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <div   
        v-if="authStore.token"
        class="user-profile">
        <img
          class="avatar"
          src="https://i.pravatar.cc/100"
          alt="avatar"
        />

        <h3>
          {{ user?.username || 'User' }}
        </h3>

        <p>
          {{ user?.email || 'user@email.com' }}
        </p>
      </div>

      <nav class="nav-links">
          <RouterLink
            to="/"
            class="nav-link"
          >
            Users
          </RouterLink>

          <template v-if="authStore.token">
            <RouterLink
              :to="`/user/${route.params.id}/posts`"
              class="nav-link"
            >
              Posts
            </RouterLink>

            <RouterLink
              :to="`/user/${route.params.id}/todos`"
              class="nav-link"
            >
              Todos
            </RouterLink>

            <RouterLink
              :to="`/user/${route.params.id}/albums`"
              class="nav-link"
            >
              Albums
            </RouterLink>

            <RouterLink
              :to="`/user/${route.params.id}/companies`"
              class="nav-link"
            >
              Companies
            </RouterLink>
          </template>
        </nav>
    </div>

    <button
      v-if="authStore.token"
      class="logout-btn"
      @click="logout"
    >
      <span class="logout-icon">↪</span>
      <span>Logout</span>
    </button>

    <div class="sidebar-footer">
      N2Mobil
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

import {
  RouterLink,
  useRoute,
  useRouter,
} from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const userStore = useUserStore()

const user = computed(() => {
  return userStore.selectedUser
})

async function logout() {
  authStore.logout()

  await router.push('/')

  window.location.reload()
}


</script>

<style scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #ffffff;
  border-right: 1px solid #ececf3;

  padding: 28px 18px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

.sidebar-top {
  flex: 1;
}

.user-profile {
  text-align: center;
  margin-bottom: 32px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 14px;
}

.user-profile h3 {
  margin: 0;
  font-size: 22px;
  color: #111827;
}

.user-profile p {
  margin-top: 6px;
  color: #94a3b8;
  font-size: 14px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  text-decoration: none;
  color: #475569;

  padding: 14px 16px;
  border-radius: 16px;

  transition: 0.2s ease;
  font-weight: 600;
}

.nav-link:hover {
  background: #f3f0ff;
  color: #6c5ce7;
}

.router-link-active {
  background: #eeeafe;
  color: #6c5ce7;
}

.logout-btn {
  width: 100%;

  border: 1px solid #fecaca;
  background: #fff5f5;
  color: #dc2626;

  padding: 14px 16px;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 800;
  cursor: pointer;

  transition: 0.2s ease;
  margin-bottom: 26px;
}

.logout-btn:hover {
  background: #dc2626;
  color: #ffffff;
  border-color: #dc2626;

  transform: translateY(-1px);

  box-shadow: 0 12px 24px rgba(220, 38, 38, 0.22);
}

.logout-icon {
  font-size: 18px;
}

.sidebar-footer {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}
</style>