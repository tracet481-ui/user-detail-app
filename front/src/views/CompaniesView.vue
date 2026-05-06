<template>
  <section class="companies-page">
    <div class="page-header">
      <div>
        <h1>Companies</h1>
        <p>List, add, edit and delete companies.</p>
      </div>

      <button class="primary-btn" @click="openCreate">
        + New Company
      </button>
    </div>

    <div class="company-list">
      <article
        v-for="company in companies"
        :key="company.id"
        class="company-card"
      >
        <div class="company-icon">🏢</div>

        <div class="company-info">
          <h2>{{ company.name }}</h2>
          <p>{{ company.slogan || 'No Slogan' }}</p>

          <div class="meta">
            <span>🌐 {{ company.website || 'No Website ' }}</span>
            <span>📞 {{ company.phone || 'No Phone ' }}</span>
            <span>📍 {{ company.address || 'No Adress ' }}</span>
          </div>
        </div>

        <div class="actions">
          <button class="edit-btn" @click="openEdit(company)">
            Edit
          </button>

          <button class="delete-btn" @click="removeCompany(company.id)">
            Delete
          </button>
        </div>
      </article>

      <div v-if="!companies.length" class="empty">
        No companies yet.
      </div>
    </div>

    <div v-if="showModal" class="overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ editingCompany ? 'Edit Company' : 'New Company' }}</h2>

    <input
      v-model="form.name"
      :class="{ 'input-error': formErrors.name }"
      placeholder="Company name"
    />

    <input
      v-model="form.slogan"
      placeholder="Slogan"
    />

    <input
      v-model="form.website"
      :class="{ 'input-error': formErrors.website }"
      placeholder="Website - @ zorunlu"
    />

    <input
      v-model="form.phone"
      :class="{ 'input-error': formErrors.phone }"
      placeholder="Phone - sayı zorunlu"
    />

    <textarea
      v-model="form.address"
      :class="{ 'input-error': formErrors.address }"
      placeholder="Address"
    ></textarea>

        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">
            Cancel
          </button>

          <button class="primary-btn" @click="saveCompany">
            Save
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteDialog"
      class="overlay"
      @click.self="cancelDeleteCompany"
    >
      <div class="confirm-dialog">
        <h2>Should the company be deleted?</h2>

        <p>
          This action is irreversible. The company registration will be permanently deleted.
        </p>

        <div class="modal-actions">
          <button class="cancel-btn" @click="cancelDeleteCompany">
            Cancel
          </button>

          <button class="delete-btn" @click="confirmDeleteCompany">
            Delete
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useToastStore } from '../stores/toastStore'

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../modules/company/services/companyService'

  

const companies = ref([])
const showModal = ref(false)
const editingCompany = ref(null)

const showDeleteDialog = ref(false)
const selectedCompanyId = ref(null)

const toastStore = useToastStore()

const form = reactive({
  name: '',
  slogan: '',
  website: '',
  phone: '',
  address: '',
})

onMounted(async () => {
  await loadCompanies()
})

async function loadCompanies() {
  try {
    companies.value = await getCompanies()
  } catch (error) {
    toastStore.showError('An error occurred while retrieving the company list.')
  }
}

function openCreate() {
  editingCompany.value = null
  resetForm()
  showModal.value = true
}

function openEdit(company) {
  editingCompany.value = company

  form.name = company.name || ''
  form.slogan = company.slogan || ''
  form.website = company.website || ''
  form.phone = company.phone || ''
  form.address = company.address || ''

  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingCompany.value = null
  resetForm()
}

function resetForm() {
  formErrors.name = false
  formErrors.website = false
  formErrors.phone = false
  formErrors.address = false
}

async function saveCompany() {
  if (!validateForm()) {
    toastStore.showError('Please fill in the red areas correctly.')
    return
  }

  const payload = {
    name: form.name,
    slogan: form.slogan,
    website: form.website,
    phone: form.phone,
    address: form.address,
  }

  try {
    if (editingCompany.value) {
      const updated = await updateCompany(editingCompany.value.id, payload)

      const index = companies.value.findIndex((c) => c.id === updated.id)

      if (index !== -1) {
        companies.value[index] = updated
      }

      toastStore.showSuccess('Company updated successfully.')
    } else {
      const created = await createCompany(payload)
      companies.value.unshift(created)

      toastStore.showSuccess('Company added successfully.')
    }

    closeModal()
  } catch (error) {
    toastStore.showError('An error occurred while registering the company..')
  }
}

function removeCompany(id) {
  selectedCompanyId.value = id
  showDeleteDialog.value = true
}

async function confirmDeleteCompany() {
  try {
    await deleteCompany(selectedCompanyId.value)

    companies.value = companies.value.filter(
      (company) => company.id !== selectedCompanyId.value
    )

    toastStore.showSuccess('Company was successfully deleted.')
  } catch (error) {
    toastStore.showError('An error occurred while deleting Company.')
  } finally {
    showDeleteDialog.value = false
    selectedCompanyId.value = null
  }
}

function cancelDeleteCompany() {
  showDeleteDialog.value = false
  selectedCompanyId.value = null
}

const formErrors = reactive({
  name : false,
  wwebsite : false,
  phone : false,
  address : false,

})


function validateForm () {

  formErrors.name = !form.name.trim ()
  formErrors.website = !form.name.trim () || !form.website.includes("@")
  formErrors.phone = !form.phone.trim () || !/\d/.test(form.phone)
  formErrors.address =  !form.address.trim ()

  return !Object.values(formErrors).some(Boolean) 

}



</script>

<style scoped>
.companies-page {
  height: calc(100vh - 48px);
  background: #fff;
  border-radius: 18px;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.page-header h1 {
  margin: 0;
  font-size: 30px;
  color: #111827;
}

.page-header p {
  margin: 6px 0 0;
  color: #64748b;
}

.primary-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}

.company-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.company-card {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}

.company-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #f1efff;
  color: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.company-info {
  flex: 1;
}

.company-info h2 {
  margin: 0 0 6px;
  font-size: 20px;
  color: #111827;
}

.company-info p {
  margin: 0 0 12px;
  color: #64748b;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  color: #475569;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  background: #f1f5f9;
  color: #334155;
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
}

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
}

.empty {
  background: #f8fafc;
  color: #64748b;
  padding: 24px;
  border-radius: 16px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 24px;
}

.modal,
.confirm-dialog {
  width: 460px;
  background: #fff;
  border-radius: 24px;
  padding: 26px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
}

.modal h2,
.confirm-dialog h2 {
  margin: 0 0 20px;
  color: #111827;
}

.confirm-dialog p {
  margin: 0 0 22px;
  color: #64748b;
  line-height: 1.5;
}

.modal input,
.modal textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid #dbe1ea;
  border-radius: 12px;
  margin-bottom: 12px;
  outline: none;
}

.modal textarea {
  min-height: 90px;
  resize: vertical;
}

.modal input:focus,
.modal textarea:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  background: #f1f5f9;
  color: #334155;
  border: none;
  padding: 12px 18px;
  border-radius: 14px;
  cursor: pointer;
}


.modal input.input-error,
.modal textarea.input-error {
  border-color: #dc2626;
  background: #fff1f2;
}

.modal input.input-error:focus,
.modal textarea.input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.12);
}


</style>