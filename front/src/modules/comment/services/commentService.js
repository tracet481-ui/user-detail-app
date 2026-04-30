import { request, jsonRequest } from '../../../services/api'

export const getCommentsByPost = (postId) =>
  request(`/comments/?post=${postId}`)

export const createComment = (data) =>
  jsonRequest('/comments/', 'POST', data)

export const updateComment = (id, data) =>
  jsonRequest(`/comments/${id}/`, 'PATCH', data)

export const deleteComment = (id) =>
  request(`/comments/${id}/`, {
    method: 'DELETE',
  })