<template>
  <div>
    <div class="header">
      <h1>All users</h1>

      <button class="new-btn" @click="openModal">
        + New User
      </button>
    </div>

    <div class="grid">
      <!-- <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        @delete-user="removeUser" -->


        <UserCard
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          @click="goToUser(user)"
          @delete-user="removeUser"
        />
      
    </div>

    <div v-if="showModal" class="overlay" @click.self="closeModal">
      <div class="modal">
        <h2>New User</h2>

        <input
          v-model="form.name"
          :class="{ 'input-error': formErrors.name }"
          placeholder="Name"
        />

        <input
          v-model="form.username"
          :class="{ 'input-error': formErrors.username }"
          placeholder="Username"
        />

        <input
          v-model="form.email"
          :class="{ 'input-error': formErrors.email }"
          placeholder="Email - @ necessary"
        />

        <div
          class="select-wrapper"
          :class="{ 'input-error': formErrors.company }"
        >
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
          <button class="cancel-btn" @click="closeModal">
            Cancel
          </button>

          <button class="save-btn" @click="saveUser">
            Save
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteDialog"
      class="overlay"
      @click.self="cancelDeleteUser"
    >
      <div class="confirm-dialog">
        <h2>Should the user be deleted?</h2>

        <p>
          This action is irreversible. The user will be permanently deleted.
        </p>

        <div class="modal-actions">
          <button class="cancel-btn" @click="cancelDeleteUser">
            Cancel  
          </button>

          <button class="delete-btn" @click="confirmDeleteUser">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import UserCard from '../components/UserCard.vue'
import { useToastStore } from '../stores/toastStore'
import { getCompanies } from '../modules/company/services/companyService'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'



import {
  getAllUsers,
  createUser,
  deleteUser,
} from '../services/userService'

const toastStore = useToastStore()

const users = ref([])
const search = ref('')
const showModal = ref(false)
const companies = ref([])
const router = useRouter()
const authStore = useAuthStore()



const showDeleteDialog = ref(false)
const selectedUserId = ref(null)

const form = reactive({
  name: '',
  username: '',
  email: '',
  company: '',
})

const formErrors = reactive({
  name: false,
  username: false,
  email: false,
  company: false,
})

onMounted(async () => {
  try {
    users.value = await getAllUsers()
    companies.value = await getCompanies()
  } catch (error) {
    toastStore.showError('Veriler alınırken hata oluştu.')
  }
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const text = `${user.name} ${user.username} ${user.email}`.toLowerCase()
    return text.includes(search.value.toLowerCase())
  })
})

function openModal() {
  resetForm()
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  resetForm()
}

function resetForm() {
  form.name = ''
  form.username = ''
  form.email = ''
  form.company = ''

  formErrors.name = false
  formErrors.username = false
  formErrors.email = false
  formErrors.company = false
}

function validateForm() {
  formErrors.name = !form.name.trim()
  formErrors.username = !form.username.trim()
  formErrors.email = !form.email.trim() || !form.email.includes('@')
  formErrors.company = !form.company

  return !Object.values(formErrors).some(Boolean)
}

async function saveUser() {
  if (!validateForm()) {
    toastStore.showError('Lütfen kırmızı alanları doğru doldurun.')
    return
  }

  try {
    const created = await createUser({
      name: form.name,
      username: form.username,
      email: form.email,
      company: form.company,
    })

    users.value.unshift(created)

    toastStore.showSuccess('User created successfully.')
    closeModal()
  } catch (error) {
    toastStore.showError('An error occurred while creating the user..')
  }
}

function removeUser(id) {
  selectedUserId.value = id
  showDeleteDialog.value = true
}

async function confirmDeleteUser() {
  try {
    await deleteUser(selectedUserId.value)

    users.value = users.value.filter(
      (user) => user.id !== selectedUserId.value
    )

    toastStore.showSuccess('User deleted successfully.')
  } catch (error) {
    toastStore.showError('An error occurred while deleting the user.')
  } finally {
    showDeleteDialog.value = false
    selectedUserId.value = null
  }
}

function cancelDeleteUser() {
  showDeleteDialog.value = false
  selectedUserId.value = null
}

function goToLogin(user) {
  router.push({
    path : "/login",
    query: {
      userId : user.id,
      username : user.username,
    },
  })
}




function goToUser(user) {
  if (!user?.id) return

  if (authStore.token) {
    router.push(`/user/${user.id}/posts`)
    return
  }

  router.push({
    path: '/login',
    query: {
      userId: user.id,
      username: user.username,
    },
  })
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

.modal,
.confirm-dialog {
  width: 420px;
  background: white;
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
}

.modal h2,
.confirm-dialog h2 {
  margin: 0 0 20px;
}

.confirm-dialog p {
  color: #64748b;
  margin-bottom: 24px;
}

.modal input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid #dbe1ea;
  border-radius: 12px;
  margin-bottom: 12px;
}

.input-error {
  border-color: #dc2626 !important;
  background: #fff1f2 !important;
}

.input-error select {
  border-color: #dc2626 !important;
  background: #fff1f2 !important;
}

.input-error:focus {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.12);
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

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
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
  appearance: none;
  background: white;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.select-wrapper select:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
}

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