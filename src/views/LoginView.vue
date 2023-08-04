<script setup>
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { stateLogin } from '../../store.js'

const loginData = reactive({
  email: '',
  password: ''
})
const axios = inject('axios')
const router = useRouter()
const alert = ref('')
async function submit() {
  try {
    const responseLogin = await axios.post('/api/auth/login', this.loginData)
    localStorage.setItem('token', responseLogin.data.token)
    stateLogin.login = true
    router.push('/')
    alert.value = ''
  } catch (error) {
    console.log(error)
    const status = error.response.status
    if (status == 422) {
      alert.value = 'ISI SEMUA FIELD FORM'
    }
    if (status == 401) {
      alert.value = 'EMAIL ATAU PASSWORD SALAH'
    }
  }
}
</script>

<template>
  <main class="login">
    <h1>Login</h1>
    <p>Mohon login untuk melanjutkan</p>
    <div class="alert-message" v-if="alert != ''">
      <p class="alert-error">{{ alert }}</p>
    </div>
    <div class="container-form">
      <form action="">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Masukkan email anda"
          v-model="loginData.email"
          required
        />
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan password anda"
          v-model="loginData.password"
          required
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
  max-width: 1200px;
  margin: 50px auto 0 auto;
  h1 {
    margin-bottom: 10px;
  }
  .alert-message {
    padding: 5px;
    display: flex;
    justify-content: center;
    background-color: red;
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
