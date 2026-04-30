import { request, jsonRequest } from '../../../services/api'

export const getCompanies = () =>
  request('/companies/')

export const createCompany = (data) =>
  jsonRequest('/companies/', 'POST', data)

export const updateCompany = (id, data) =>
  jsonRequest(`/companies/${id}/`, 'PATCH', data)

export const deleteCompany = (id) =>
  request(`/companies/${id}/`, {
    method: 'DELETE',
  })