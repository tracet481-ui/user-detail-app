<template>
  <div class="user-card" @click="goDetail">
    <button class="delete-user-btn" @click.stop="$emit('delete-user', user.id)">
      Delete
    </button>

    <div class="user-top">
      <img class="avatar" :src="avatarUrl" alt="User avatar" />

      <div class="user-main">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p class="phone">{{ user.phone || '+90 555 678 12 23' }}</p>
      </div>
    </div>

    <div class="divider"></div>

    <div class="info-list">
      <div class="info-row">
        <span>📍</span>
        <div>
          <strong>Location</strong>
          <p>{{ user.location || 'Yeni Mahalle / Ankara' }}</p>
        </div>
      </div>

      <div class="info-row">
        <span>🏢</span>
        <div>
          <strong>Company</strong>
          <p>{{ user.company?.name || 'No company' }}</p>
        </div>
      </div>

      <div class="info-row">
        <span>🌐</span>
        <div>
          <strong>Website</strong>
          <p>{{ user.website || user.username + '.com' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

defineEmits(['delete-user'])

const router = useRouter()

const avatarUrl = computed(() => {
  return `https://i.pravatar.cc/120?u=${props.user.id}`
})

function goDetail() {
  router.push(`/user/${props.user.id}`)
}
</script>

<style scoped>
.user-card {
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 24px;
  cursor: pointer;
  transition: 0.2s;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.delete-user-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.user-top {
  display: flex;
  gap: 18px;
  align-items: center;
}

.avatar {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  object-fit: cover;
}

.user-main h3 {
  margin: 0 0 6px;
}

.user-main p {
  margin: 0 0 4px;
  color: #64748b;
}

.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 22px 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-row {
  display: flex;
  gap: 12px;
}

.info-row strong {
  display: block;
  margin-bottom: 4px;
}

.info-row p {
  margin: 0;
  color: #64748b;
}
</style>