<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const router = useRouter()

const logout = async () => {
  try {
    const responseLogout = await axios.post(
      `http://127.0.0.1:8000/api/logout`,
      {
        undefined
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseLogout.status == 200) {
      console.log(responseLogout)
      console.log('Berhasil Logout')
      token.value = localStorage.clear()
      router.push('/login')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <h1>Home Admin</h1>
    <button @click="logout()">Logout</button>
  </main>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  font-family: 'Open Sans', sans-serif;
}
main {
  background-color: white;
  color: black;
  width: 100%;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 50px auto 0 auto;
}
</style>
