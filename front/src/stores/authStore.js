import { defineStore } from 'pinia'
import { ref } from 'vue'

import { loginUser } from '../modules/auth/services/authService'
function getStoredUser() {
  const storedUser = localStorage.getItem('currentUser')

  if (!storedUser || storedUser === 'undefined') {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch {
    return null
  }
}




// export const useAuthStore = defineStore(
//   'authStore',
//   () => {
//     const token = ref(
//       localStorage.getItem('accessToken')
//     )

//     function getStoredUser() {
//         const storedUser = localStorage.getItem('currentUser')

//         if (!storedUser || storedUser === 'undefined') {
//             return null
//         }

//         try {
//             return JSON.parse(storedUser)
//         } catch {
//             return null
//         }
//         }

//         const currentUser = ref(getStoredUser())

//     async function login(data) {
//       const result = await loginUser(data)

//       token.value = result.access
//       currentUser.value = result.user

//       localStorage.setItem(
//         'accessToken',
//         result.access
//       )

//       localStorage.setItem(
//         'refreshToken',
//         result.refresh
//       )

//       localStorage.setItem(
//         'currentUser',
//         JSON.stringify(result.user)
//       )

//       return result.user
//     }

//     function logout() {
//       token.value = null
//       currentUser.value = null

//       localStorage.removeItem('accessToken')
//       localStorage.removeItem('refreshToken')
//       localStorage.removeItem('currentUser')
//     }

//     return {
//       token,
//       currentUser,
//       login,
//       logout,
//     }
//   }
// )

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('accessToken'))
  const currentUser = ref(getStoredUser())

  async function login(data) {
    const result = await loginUser(data)

    token.value = result.access
    currentUser.value = result.user

    localStorage.setItem('accessToken', result.access)
    localStorage.setItem('refreshToken', result.refresh)
    localStorage.setItem('currentUser', JSON.stringify(result.user))

    return result.user
  }

  function logout() {
    token.value = null
    currentUser.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('currentUser')
  }

  return {
    token,
    currentUser,
    login,
    logout,
  }
})