<template>
  <div class="sidebar">
    <div v-if="isUserDetailPage" class="user-box">
      <img
        class="user-avatar"
        :src="avatarUrl"
        alt="User avatar"
      />

      <div>
        <h3>{{ selectedUser?.name || 'User' }}</h3>
        <p>{{ selectedUser?.email || 'user@email.com' }}</p>
      </div>
    </div>

    <div v-else class="logo">Task 5</div>

    <nav v-if="!isUserDetailPage">
      <router-link to="/" class="nav-item">Users</router-link>
      <router-link to="/companies" class="nav-item">Companies</router-link>
    </nav>

<nav v-else>
  <router-link :to="`/user/${userId}`" class="nav-item">User</router-link>
  <router-link :to="`/user/${userId}/posts`" class="nav-item">Posts</router-link>
  <router-link :to="`/user/${userId}/todos`" class="nav-item">Todos</router-link>
  <router-link :to="`/user/${userId}/albums`" class="nav-item">Albums</router-link>
  <router-link :to="`/user/${userId}/companies`" class="nav-item">Companies</router-link>
</nav>

    <div class="brand">N2Mobil</div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getUserById } from '../services/userService'

const route = useRoute()

const selectedUser = ref(null)

const userId = computed(() => route.params.id)

const isUserDetailPage = computed(() => {
  return route.path.startsWith('/user/')
})

const avatarUrl = computed(() => {
  return `https://i.pravatar.cc/80?u=${userId.value}`
})

watchEffect(async () => {
  if (isUserDetailPage.value && userId.value) {
    selectedUser.value = await getUserById(userId.value)
  }
})
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
}

.logo {
  font-weight: 700;
  margin-bottom: 32px;
  color: #111827;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 48px;
  margin-bottom: 48px;
  border-bottom: 1px solid #e5e7eb;
}

.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.user-box h3 {
  margin: 0;
  font-size: 15px;
  color: #111827;
}

.user-box p {
  margin: 3px 0 0;
  font-size: 12px;
  color: #6b7280;
}

.nav-item {
  display: block;
  padding: 12px 14px;
  border-radius: 10px;
  color: #6b7280;
  text-decoration: none;
  margin-bottom: 10px;
  font-weight: 500;
}

.nav-item.router-link-active {
  background: #f1efff;
  color: #6c5ce7;
  border-left: 4px solid #6c5ce7;
}

.brand {
  margin-top: auto;
  font-weight: 700;
  color: #374151;
}
</style>