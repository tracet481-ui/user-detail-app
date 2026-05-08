// const BASE_URL = 'http://127.0.0.1:8000/api'

// async function request(endpoint, options = {}) {
//   const response = await fetch(`${BASE_URL}${endpoint}`, options)

//   if (!response.ok) {
//     let message = 'Bir hata oluştu.'

//     try {
//       const errorData = await response.json()
//       message = errorData.detail || JSON.stringify(errorData)
//     } catch {
//       message = await response.text()
//     }

//     throw new Error(message)
//   }

//   if (response.status === 204) return null

//   return response.json()
// }

// function jsonRequest(endpoint, method, data) {
//   return request(endpoint, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
// }

// // USERS
// export const getUsers = () => request('/users/')

// export const getUserById = (id) => request(`/users/${id}/`)

// export const createUser = (userData) =>
//   jsonRequest('/users/', 'POST', userData)

// export const deleteUser = (id) =>
//   request(`/users/${id}/`, {
//     method: 'DELETE',
//   })

// // POSTS
// export const getPostsByUser = (userId) =>
//   request(`/posts/?user=${userId}`)

// // ALBUMS
// export const getAlbumsByUser = (userId) =>
//   request(`/albums/?user=${userId}`)

// export const createAlbum = (data) =>
//   jsonRequest('/albums/', 'POST', data)

// export const deleteAlbum = (id) =>
//   request(`/albums/${id}/`, {
//     method: 'DELETE',
//   })

// // PHOTOS
// export const getPhotosByAlbum = (albumId) =>
//   request(`/albums/${albumId}/photos/`)

// export const uploadPhoto = (albumId, file, title = '') => {
//   const formData = new FormData()

//   formData.append('image', file)
//   formData.append('title', title || file.name)

//   return request(`/albums/${albumId}/photos/`, {
//     method: 'POST',
//     body: formData,
//   })
// }

// export const deletePhoto = (photoId) =>
//   request(`/albums/photos/${photoId}/`, {
//     method: 'DELETE',
//   })

// // TODOS
// export const getTodosByUser = (userId) =>
//   request(`/todos/?user=${userId}`)

// export const createTodo = (data) =>
//   jsonRequest('/todos/', 'POST', data)

// export const updateTodo = (id, data) =>
//   jsonRequest(`/todos/${id}/`, 'PATCH', data)

// export const deleteTodo = (id) =>
//   request(`/todos/${id}/`, {
//     method: 'DELETE',
//   })

// // Eski drawer yorum sistemi şimdilik backend'de yoksa boş döner
// export const getCommentsByPost = async () => []


  // -------------------------------------------------------------------------------------------------

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    let message = 'Bir hata oluştu.'

    if (error.response?.data) {
      const data = error.response.data

      message =
        data.detail ||
        data.message ||
        JSON.stringify(data)
    }

    return Promise.reject(new Error(message))
  }
)

export default api