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
          <p>{{ company.slogan || 'Slogan yok' }}</p>

          <div class="meta">
            <span>🌐 {{ company.website || 'Website yok' }}</span>
            <span>📞 {{ company.phone || 'Telefon yok' }}</span>
            <span>📍 {{ company.address || 'Adres yok' }}</span>
          </div>
        </div>

        <div class="actions">
          <button class="edit-btn" @click="openEdit(company)">
            Düzenle
          </button>

          <button class="delete-btn" @click="removeCompany(company.id)">
            Delete
          </button>
        </div>
      </article>

      <div v-if="!companies.length" class="empty">
        Henüz company yok.
      </div>
    </div>

    <div v-if="showModal" class="overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ editingCompany ? 'Company Düzenle' : 'New Company' }}</h2>

        <input v-model="form.name" placeholder="Company name" />
        <input v-model="form.slogan" placeholder="Slogan" />
        <input v-model="form.website" placeholder="Website" />
        <input v-model="form.phone" placeholder="Phone" />
        <textarea v-model="form.address" placeholder="Address"></textarea>

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
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../modules/company/services/companyService'

const companies = ref([])
const showModal = ref(false)
const editingCompany = ref(null)

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
  companies.value = await getCompanies()
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
  form.name = ''
  form.slogan = ''
  form.website = ''
  form.phone = ''
  form.address = ''
}

async function saveCompany() {
  if (!form.name.trim()) {
    alert('Company name zorunlu')
    return
  }

  const payload = {
    name: form.name,
    slogan: form.slogan,
    website: form.website,
    phone: form.phone,
    address: form.address,
  }

  if (editingCompany.value) {
    const updated = await updateCompany(editingCompany.value.id, payload)

    const index = companies.value.findIndex((c) => c.id === updated.id)
    companies.value[index] = updated
  } else {
    const created = await createCompany(payload)
    companies.value.unshift(created)
  }

  closeModal()
}

async function removeCompany(id) {
  if (!confirm('Company silinsin mi?')) return

  await deleteCompany(id)
  companies.value = companies.value.filter((company) => company.id !== id)
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

.modal {
  width: 460px;
  background: #fff;
  border-radius: 24px;
  padding: 26px;
}

.modal h2 {
  margin: 0 0 20px;
  color: #111827;
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
</style>