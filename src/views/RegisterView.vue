<script setup>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const formsRegister = reactive({
  name: '',
  email: '',
  password: ''
})

const router = useRouter()

async function submit(){
    try{
        const responseRegister = await axios.post('http://127.0.0.1:8000/api/auth/register', this.formsRegister)
        if(responseRegister.status == 200){
            const ContainerAlert = document.querySelector('.alert-request')
            ContainerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Mendaftar Sebagai Member</p>`
            setTimeout(()=>{
                router.push('/login')
            }, 2000)
        }
    }catch(error){
        const ContainerAlert = document.querySelector('.alert-request')
        ContainerAlert.innerHTML = `<p style="color:red;"> Mohon Lengkapi semua field yang ada atau email sudah terdaftar</p>`
    }
}
</script>

<template>
  <main class="register">
    <h1>Create Account</h1>
    <div class="container-form" id="container-form">
      <div class="alert-request"></div>
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
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Masukkan password anda"
          v-model="formsRegister.password"
        />
        <div class="container-button">
          <button type="button" @click="submit()">Register</button>
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
