<template>
  <div>
    <div class="header">
      <h1>All users</h1>

      <button class="new-btn" @click="openModal">
        + New User
      </button>
    </div>

 

    <div class="grid">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        @delete-user="removeUser"
      />
    </div>

    <div v-if="showModal" class="overlay" @click.self="closeModal">
      <div class="modal">
        <h2>New User</h2>

        <input v-model="form.name" placeholder="Name" />
        <input v-model="form.username" placeholder="Username" />
        <input v-model="form.email" placeholder="Email" />

        <div class="select-wrapper">
          <select v-model="form.company">
            <option value="">Select company</option>

            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ company.name }}
            </option>
          </select>

          <span class="arrow">⌄</span>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Cancel</button>
          <button class="save-btn" @click="saveUser">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import UserCard from '../components/UserCard.vue'
import { getCompanies } from '../modules/company/services/companyService'


import {
  getAllUsers,
  createUser,
  deleteUser,
} from '../services/userService'

const users = ref([])
const search = ref('')
const showModal = ref(false)
const companies = ref([])

const form = reactive({
  name: '',
  username: '',
  email: '',
  company:"",
})

onMounted(async () => {
  users.value = await getAllUsers()
  companies.value = await getCompanies()
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const text = `${user.name} ${user.username} ${user.email}`.toLowerCase()
    return text.includes(search.value.toLowerCase())
  })
})

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.name = ''
  form.username = ''
  form.email = ''
  form.companies  = "" 
}

async function saveUser() {
  if (!form.name.trim() || !form.username.trim() || !form.email.trim()) {
    alert('Name, username ve email zorunlu')
    return
  }

  const created = await createUser({
    name: form.name,
    username: form.username,
    email: form.email,
    company: form.company || null,
  })

  users.value.unshift(created)
  closeModal()
}

async function removeUser(id) {
  if (!confirm('Should this user be deleted?')) return

  await deleteUser(id)
  users.value = users.value.filter((user) => user.id !== id)
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  margin: 0;
  font-size: 28px;
  color: #111827;
}

.new-btn {
  background: #6c5ce7;
  color: white;
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

.search {
  width: 320px;
  padding: 13px 15px;
  border-radius: 12px;
  border: 1px solid #dbe1ea;
  margin-bottom: 24px;
  outline: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  width: 420px;
  background: white;
  border-radius: 22px;
  padding: 26px;
}

.modal h2 {
  margin: 0 0 20px;
}

.modal input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid #dbe1ea;
  border-radius: 12px;
  margin-bottom: 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

.cancel-btn {
  background: #f1f5f9;
  color: #334155;
  border: none;
  padding: 11px 16px;
  border-radius: 12px;
  cursor: pointer;
}

.save-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 11px 16px;
  border-radius: 12px;
  cursor: pointer;
}


.select-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
}

.select-wrapper select {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #dbe1ea;
  border-radius: 12px;
  appearance: none; /* 🔥 default ok gider */
  background: white;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

/* hover / focus */
.select-wrapper select:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
}

/* custom arrow */
.arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #64748b;
  font-size: 14px;
}


</style>