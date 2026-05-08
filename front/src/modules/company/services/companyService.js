import api from '../../../services/api'

export async function getCompanies() {
  const response = await api.get('/companies/')
  return response.data
}

export async function createCompany(data) {
  const response = await api.post('/companies/', data)
  return response.data
}

export async function updateCompany(id, data) {
  const response = await api.patch(`/companies/${id}/`, data)
  return response.data
}

export async function deleteCompany(id) {
  await api.delete(`/companies/${id}/`)
  return true
}