import { request, jsonRequest } from '../../../services/api'

export const getAlbumsByUser = (userId) =>
  request(`/albums/?user=${userId}`)

export const createAlbum = (data) =>
  jsonRequest('/albums/', 'POST', data)

export const updateAlbum = (id, data) =>
  jsonRequest(`/albums/${id}/`, 'PATCH', data)

export const deleteAlbum = (id) =>
  request(`/albums/${id}/`, {
    method: 'DELETE',
  })

export const getPhotosByAlbum = (albumId) =>
  request(`/albums/${albumId}/photos/`)

export const uploadPhoto = (albumId, file, title = '') => {
  const formData = new FormData()

  formData.append('image', file)
  formData.append('title', title || file.name)

  return request(`/albums/${albumId}/photos/`, {
    method: 'POST',
    body: formData,
  })
}

export const deletePhoto = (photoId) =>
  request(`/albums/photos/${photoId}/`, {
    method: 'DELETE',
  })