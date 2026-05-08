import api from '../../../services/api'

export async function getAlbumsByUser(userId) {
  const response = await api.get(
    `/albums/?user=${userId}`
  )

  return response.data
}

export async function createAlbum(data) {
  const response = await api.post(
    '/albums/',
    data
  )

  return response.data
}

export async function updateAlbum(id, data) {
  const response = await api.patch(
    `/albums/${id}/`,
    data
  )

  return response.data
}

export async function deleteAlbum(id) {
  await api.delete(`/albums/${id}/`)
  return true
}

export async function getPhotosByAlbum(albumId) {
  const response = await api.get(
    `/albums/${albumId}/photos/`
  )

  return response.data
}

export async function uploadPhoto(
  albumId,
  file,
  title = ''
) {
  const formData = new FormData()

  formData.append('image', file)
  formData.append('title', title || file.name)

  const response = await api.post(
    `/albums/${albumId}/photos/`,
    formData
  )

  return response.data
}

export async function deletePhoto(photoId) {
  await api.delete(`/albums/photos/${photoId}/`)
  return true
}