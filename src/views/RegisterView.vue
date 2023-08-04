<script setup>
import { reactive, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const formsRegister = reactive({
  name: '',
  email: '',
  password: ''
})

const router = useRouter()
const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const submit = async () => {
  sendingFormLoading.value = true
  try {
    const responseRegister = await axios.post('/api/auth/register', formsRegister)
    if (responseRegister.status == 200) {
      alert.value = ''
      alertSukses.value = 'BERHASIL MENDAFTAR'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
    sendingFormLoading.value = false
  } catch (error) {
    console.log(error)
    if (formsRegister.name == '' || formsRegister.email == '' || formsRegister.password == '') {
      alert.value = 'ISI SEMUA FIELD FORM'
    } else if (error.response.data.message == 'The password must be at least 8 characters.') {
      alert.value = 'PASSWORD MIN 8 KARAKTER'
    } else {
      alert.value = 'EMAIL TELAH DIGUNAKAN'
    }
    sendingFormLoading.value = false
  }
}
</script>

<template>
  <main class="register">
    <h1>Membuat Akun</h1>
    <div class="container-form" id="container-form">
      <div class="alert-message-gagal" v-if="alert != ''">
        <p>{{ alert }}</p>
      </div>
      <div class="alert-message-sukses" v-if="alertSukses != ''">
        <p>{{ alertSukses }}</p>
      </div>
      <form action="">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Masukkan nama anda"
          v-model="formsRegister.name"
        />
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Masukkan email anda"
          v-model="formsRegister.email"
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Masukkan password anda"
          v-model="formsRegister.password"
          required
        />
        <div class="container-button">
          <button type="button" @click="submit()" v-if="sendingFormLoading == false">
            Register
          </button>
          <button type="button" v-if="sendingFormLoading == true" disabled>
            <i class="fa-solid fa-spinner fa-xl"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="container-link-login">
      <p>
        Already have an account ?<span><a class="login-link" href="/login">Login</a></span>
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
  .container-form {
    .alert-message-sukses {
      display: flex;
      justify-content: center;
      background-color: rgb(196, 255, 48);
      padding: 5px;
    }
    .alert-message-gagal {
      display: flex;
      justify-content: center;
      background-color: rgb(255, 0, 0);
      padding: 5px;
    }
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
  .container-link-login {
    display: flex;
    justify-content: center;
    margin-top: 50%;
    .login-link {
      color: red;
    }
  }
}
</style>
