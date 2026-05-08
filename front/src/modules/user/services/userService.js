import api from '../../../services/api'

export async function getAllUsers() {
  const response = await api.get('/users/')
  return response.data
}

export async function getUserById(id) {
  const response = await api.get(
    `/users/${id}/`
  )

  return response.data
}

export async function createUser(userData) {
  const response = await api.post(
    '/users/',
    userData
  )

  return response.data
}

export async function updateUser(id, userData) {
  const response = await api.patch(
    `/users/${id}/`,
    userData
  )

  return response.data
}

export async function deleteUser(id) {
  await api.delete(`/users/${id}/`)
  return true
}