<script setup>
import { createUser } from '../services/userService'

const sendTestUser = async () => {
  try {
    const response = await createUser({
      name: 'Sefa',
      username: 'sefatest',
      email: 'sefa@test.com',
    })

    console.log(response)
    toastStore.showSuccess('Başarılı ')
  } catch (error) {
    console.error(error)
    toastStore.showSuccess('İstek Başarsız! ')
  }
}
</script>

<template>
  <button @click="sendTestUser">Backend Test</button>
</template>