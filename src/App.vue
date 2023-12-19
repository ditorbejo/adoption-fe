<script setup>
import { onMounted, ref, watch, inject } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { stateLogin } from '../store.js'

const axios = inject('axios')
const navbarMenuOpen = ref(false)

const toggleNavbar = () => {
  navbarMenuOpen.value = !navbarMenuOpen.value
}
const closeNavbar = () => {
  navbarMenuOpen.value = !navbarMenuOpen.value
}

let token = localStorage.getItem('token')

const roleUser = ref('guest')
const checkUserLogin = async () => {
  try {
    const loginResponse = await axios.get('/api/auth/role', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (loginResponse.status == 200) {
      stateLogin.login = true
      roleUser.value = loginResponse.data.role
    }
  } catch (error) {

  }
}

watch(stateLogin, async () => {
  token = localStorage.getItem('token')
  if (token) {
    checkUserLogin()
  }

})

const router = useRouter()
const logOutUser = async () => {
  try {
    const responseLogout = await axios.post(
      `/api/logout`,
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

      stateLogin.login = false

      router.push('/login')
      localStorage.clear()
      token = null
    }
  } catch (error) {

  }
}


onMounted(() => {

  if (token) {
    checkUserLogin()
  }
})
</script>

<template>
  <header>
    <div class="container-home">
      <p class="loremIpsumHome">
        <router-link class="home" to="/"> LoremIpsum </router-link>
      </p>
    </div>
    <button aria-label="navigasi" class="hamburger-button" @click="toggleNavbar()">
      <svg
        class="hamburger-icon"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
        />
      </svg>
    </button>
    <div class="nav-open" v-if="navbarMenuOpen == true" @click="closeNavbar()">
      <ul class="list-navbar" v-if="roleUser == 'user'">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/list-warna-kucing">Warna</router-link>
        </li>
        <li>
          <router-link to="/list-kategori">Ras </router-link>
        </li>
        <li>
          <router-link to="/list-kucing">Adopsi </router-link>
        </li>
        <li>
          <router-link to="/list-berita">Berita </router-link>
        </li>
        <li>
          <router-link to="/about">About </router-link>
        </li>
        <div class="login-register" v-if="stateLogin.login == true">
          <li>
            <router-link to="/user/chat">Chat </router-link>
          </li>
          <li>
            <router-link to="/user/list-form-adopt">Form Adopt </router-link>
          </li>
          <li>
            <a @click="logOutUser()">Logout</a>
          </li>
        </div>
        <div class="login-register" v-if="stateLogin.login == false">
          <li>
            <router-link to="/login">Login </router-link>
          </li>
          <li>
            <router-link to="/register">Register </router-link>
          </li>
        </div>
      </ul>

      <ul class="list-navbar" v-if="roleUser == 'admin'">
        <li>
          <router-link to="/admin/home">Home </router-link>
        </li>
        <li>
          <router-link to="/admin/list-kategori">Ras </router-link>
        </li>
        <li>
          <router-link to="/admin/list-kucing">Adopsi </router-link>
        </li>
        <li>
          <router-link to="/admin/list-berita">Berita </router-link>
        </li>
        <li>
          <router-link to="/about">About </router-link>
        </li>
        <div class="login-register" v-if="stateLogin.login == true">
          <li>
            <router-link to="/admin/chat">Chat </router-link>
          </li>
          <li>
            <router-link to="/admin/list-form-adopt">Form Adopt </router-link>
          </li>
          <li>
            <router-link to="/admin/list-history-adopt">History Adopt </router-link>
          </li>
          <li>
            <a @click="logOutUser()">Logout </a>
          </li>
        </div>
        <div class="login-register" v-if="stateLogin.login == false">
          <li>
            <router-link to="/login">Login </router-link>
          </li>
          <li>
            <router-link to="/register">Register </router-link>
          </li>
        </div>
      </ul>

      <ul class="list-navbar" v-if="roleUser == 'guest'">
        <li>
          <router-link to="/">Home </router-link>
        </li>
        <li>
          <router-link to="/list-warna-kucing">Warna </router-link>
        </li>
        <li>
          <router-link to="/list-kategori">Ras </router-link>
        </li>
        <li>
          <router-link to="/list-kucing">Adopsi </router-link>
        </li>
        <li>
          <router-link to="/list-berita">Berita </router-link>
        </li>
        <li>
          <router-link to="/about">About </router-link>
        </li>
        <div class="login-register">
          <li>
            <router-link to="/login">Login </router-link>
          </li>
          <li>
            <router-link to="/register">Register </router-link>
          </li>
        </div>
      </ul>
    </div>

    <div class="nav" v-else>
      <ul class="list-navbar" v-if="roleUser == 'user'">
        <li>
          <router-link to="/">Home </router-link>
        </li>
        <li>
          <router-link to="/list-warna-kucing">Warna </router-link>
        </li>
        <li>
          <router-link to="/list-kategori">Ras </router-link>
        </li>
        <li>
          <router-link to="/list-kucing">Adopsi </router-link>
        </li>
        <li>
          <router-link to="/list-berita">Berita </router-link>
        </li>
        <li>
          <router-link to="/about">About </router-link>
        </li>
        <div class="login-register" v-if="stateLogin.login == true">
          <li>
            <router-link to="/user/chat">Chat </router-link>
          </li>
          <li>
            <router-link to="/user/list-form-adopt">Form Adopt </router-link>
          </li>
          <li>
            <a to="" @click="logOutUser()">Logout </a>
          </li>
        </div>
        <div class="login-register" v-if="stateLogin.login == false">
          <li>
            <router-link to="/login">Login </router-link>
          </li>
          <li>
            <router-link to="/register">Register </router-link>
          </li>
        </div>
      </ul>

      <ul class="list-navbar" v-if="roleUser == 'admin'">
        <li>
          <router-link to="/admin/home">Home </router-link>
        </li>
        <li>
          <router-link to="/admin/list-kategori">Ras </router-link>
        </li>
        <li>
          <router-link to="/admin/list-kucing">Adopsi </router-link>
        </li>
        <li>
          <router-link to="/admin/list-berita">Berita </router-link>
        </li>
        <li>
          <router-link to="/about">About </router-link>
        </li>
        <div class="login-register" v-if="stateLogin.login == true">
          <li>
            <router-link to="/admin/chat">Chat </router-link>
          </li>
          <li>
            <router-link to="/admin/list-form-adopt">Form Adopt </router-link>
          </li>
          <li>
            <router-link to="/admin/list-history-adopt">History Adopt </router-link>
          </li>
          <li>
            <a @click="logOutUser()">Logout </a>
          </li>
        </div>
        <div class="login-register" v-if="stateLogin.login == false">
          <li>
            <router-link to="/login">Login </router-link>
          </li>
          <li>
            <router-link to="/register">Register </router-link>
          </li>
        </div>
      </ul>

      <ul class="list-navbar" v-if="roleUser == 'guest'">
        <li>
          <router-link to="/">Home </router-link>
        </li>
        <li>
          <router-link to="/list-warna-kucing">Warna </router-link>
        </li>
        <li>
          <router-link to="/list-kategori">Ras </router-link>
        </li>
        <li>
          <router-link to="/list-kucing">Adopsi </router-link>
        </li>
        <li>
          <router-link to="/list-berita">Berita </router-link>
        </li>
        <li>
          <router-link to="/about">About </router-link>
        </li>
        <div class="login-register">
          <li>
            <router-link to="/login">Login </router-link>
          </li>
          <li>
            <router-link to="/register">Register </router-link>
          </li>
        </div>
      </ul>
    </div>
  </header>
  <RouterView />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: black;
}
header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffae11;
  padding: 5px 20px;
  position: fixed;
  top: 0;
  z-index: 99;
  .hamburger-button {
    padding: 0;
    border: none;
    background: none;
    opacity: 1;
    height: 44px;
    width: 44px;
    cursor: pointer;
    .hamburger-icon {
      font-size: 44px;
      color: #f24c3d;
    }
  }
  .container-home a {
    font-size: large;
    font-weight: 900;
  }
  .nav-open {
    display: flex;
    gap: 10px;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    align-items: center;
    background-color: #00000080;
    .list-navbar {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffae11;
      width: 50%;
      gap: 5px;
      height: 100vh;
      transform: translate(100%, 0);
      .login-register {
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      li:hover {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        width: 80%;
        a {
          color: #f24c3d;
        }
      }
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        padding: 5%;
        border: 1px solid black;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
          rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
          rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 44px;
        text-decoration: none;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bolder;
        color: black;
        font-weight: 900;
        font-size: larger;
        cursor: pointer;
      }
    }
  }
  .nav {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  header {
    .nav {
      display: none;
    }
  }
}
@media only screen and (min-width: 1024px) {
  header {
    width: 100%;
    padding: 10px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .hamburger-button {
      display: none;
    }
    .nav {
      display: flex;
      .list-navbar {
        display: flex;
        gap: 10px;
        list-style-type: none;
        .login-register {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        a:hover {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
