import { request, jsonRequest } from '../../../services/api'

export const getUsers = () =>
  request('/users/')

export const getUserById = (id) =>
  request(`/users/${id}/`)

export const createUser = (data) =>
  jsonRequest('/users/', 'POST', data)

export const updateUser = (id, data) =>
  jsonRequest(`/users/${id}/`, 'PATCH', data)

export const deleteUser = (id) =>
  request(`/users/${id}/`, {
    method: 'DELETE',
  })