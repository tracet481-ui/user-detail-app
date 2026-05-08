import api from '../../../services/api'

export async function getCommentsByPost(postId) {
  const response = await api.get(`/comments/?post=${postId}`)
  return response.data
}

export async function createComment(data) {
  const response = await api.post('/comments/', data)
  return response.data
}

export async function updateComment(id, data) {
  const response = await api.patch(`/comments/${id}/`, data)
  return response.data
}

export async function deleteComment(id) {
  await api.delete(`/comments/${id}/`)
  return true
}