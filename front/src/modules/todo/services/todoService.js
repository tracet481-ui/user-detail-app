const BASE_URL = 'http://127.0.0.1:8000/api/todos/'

export async function getAllTodos() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Todos could not be retrieved')
  return await res.json()
}

export async function getTodosByUser(userId) {
  const res = await fetch(`${BASE_URL}?user=${userId}`)
  if (!res.ok) throw new Error('Todos could not be fetched')
  return await res.json()
}

export async function createTodo(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Todo could not be created')
  return await res.json()
}

export async function updateTodo(id, data) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Todo could not be updated')
  return await res.json()
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Todo could not be deleted.')
  return true
}