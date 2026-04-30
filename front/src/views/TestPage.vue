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
    alert('Başarılı')
  } catch (error) {
    console.error(error)
    alert('İstek başarısız')
  }
}
</script>

<template>
  <button @click="sendTestUser">Backend Test</button>
</template>