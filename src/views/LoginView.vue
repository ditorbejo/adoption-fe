<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const loginData = reactive({
  email: '',
  password: ''
})

const router = useRouter()

async function submit() {
  try {
    const responseLogin = await axios.post('http://127.0.0.1:8000/api/auth/login', this.loginData)
    localStorage.setItem('token', responseLogin.data.token)
    router.push('/')
  } catch (error) {
    const ContainerAlert = document.querySelector('.alert-message')
    ContainerAlert.innerHTML =
      '<p style="color:red;">Email atau password salah atau Isi semua field yang tersedia</p>'
  }
}
</script>

<template>
  <main class="login">
    <h1>Login</h1>
    <p>Mohon login untuk melanjutkan</p>
    <div class="alert-message"></div>
    <div class="container-form">
      <form action="">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Masukkan email anda"
          v-model="loginData.email"
        />
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan password anda"
          v-model="loginData.password"
        />
        <div class="container-button">
          <button type="button" @click="submit()">Login</button>
        </div>
      </form>
    </div>
    <div class="container-register">
      <p>
        Dont have an account ? <span><a class="register-link" href="/register">Sign Up</a></span>
      </p>
    </div>
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
  h1 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
  }
  .container-form {
    form {
      display: flex;
      flex-direction: column;
      padding: 10px 5px;
      gap: 10px;
      input,
      button {
        border-radius: 10px;
        padding: 10px;
      }
      button {
        width: 100px;
        background-color: #ffd482;
      }
      .container-button {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .container-register {
    display: flex;
    justify-content: center;
    margin-top: 50%;
    .register-link {
      color: red;
    }
  }
}
</style>
