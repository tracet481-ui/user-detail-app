import api from '../../../services/api'

export async function getPostsByUser(userId) {
  const response = await api.get(
    `/posts/?user=${userId}`
  )

  return response.data
}

export async function createPost(data) {
  const response = await api.post(
    '/posts/',
    data
  )

  return response.data
}

export async function updatePost(id, data) {
  const response = await api.patch(
    `/posts/${id}/`,
    data
  )

  return response.data
}

export async function deletePost(id) {
  await api.delete(`/posts/${id}/`)
  return true
}