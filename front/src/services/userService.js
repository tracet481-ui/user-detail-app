const BASE_URL = 'http://127.0.0.1:8000/api/users/'

export const getAllUsers = async () => {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return await response.json()
}

export async function getUserById(id) {
  const response = await fetch(`${BASE_URL}${id}/`)

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  return await response.json()
}

export async function createUser(userData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  return await response.json()
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}${id}/`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }

  return true
}