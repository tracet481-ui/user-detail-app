<template>
  <div class="todos-page">
    <div class="page-header">
      <!-- <button class="back-btn" @click="goHome">← Go Home</button> -->
      <h1>Todos</h1>
    </div>

    <div class="add-box">
      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="Write new todo..."
        @keyup.enter="addTodo"
      />

      <button @click="addTodo">+ Add Todo</button>
    </div>

    <div class="todo-list">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="todo-item"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo)"
        />

        <span :class="{ done: todo.completed }">
          {{ todo.title }}
        </span>

        <button class="delete-btn" @click="removeTodo(todo.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  getTodosByUser,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../modules/todo/services/todoService'

const route = useRoute()
const router = useRouter()

const todos = ref([])
const newTodoTitle = ref('')

onMounted(async () => {
  await loadTodos()
})

async function loadTodos() {
  todos.value = await getTodosByUser(route.params.id)
}

function goHome() {
  router.push('/')
}

async function addTodo() {
  if (!newTodoTitle.value.trim()) return

  const created = await createTodo({
    title: newTodoTitle.value,
    completed: false,
    user: route.params.id,
  })

  todos.value.unshift(created)
  newTodoTitle.value = ''
}

async function toggleTodo(todo) {
  const updated = await updateTodo(todo.id, {
    completed: !todo.completed,
  })

  todo.completed = updated.completed
}

async function removeTodo(id) {
  await deleteTodo(id)
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>

<style scoped>
.todos-page {
  height: calc(100vh - 48px);
  background: #fff;
  padding: 28px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}



.page-title {
  flex-shrink: 0;
}


.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 12px 0 0;
  font-size: 28px;
  color: #111827;
}

.back-btn {
  border: none;
  background: transparent;
  color: #6c5ce7;
  font-weight: 600;
  cursor: pointer;
}

.add-box {
  flex-shrink: 0;
}

.add-box input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.add-box button {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
}

.todo-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.todo-item span {
  flex: 1;
}

.todo-item input {
  width: 18px;
  height: 18px;
}

.done {
  text-decoration: line-through;
  color: #9ca3af;
}

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}
</style>