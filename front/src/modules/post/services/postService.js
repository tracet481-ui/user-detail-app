import { request, jsonRequest } from '../../../services/api'

export const getPostsByUser = (userId) =>
  request(`/posts/?user=${userId}`)

export const createPost = (data) =>
  jsonRequest('/posts/', 'POST', data)

export const updatePost = (id, data) =>
  jsonRequest(`/posts/${id}/`, 'PATCH', data)

export const deletePost = (id) =>
  request(`/posts/${id}/`, {
    method: 'DELETE',
  })