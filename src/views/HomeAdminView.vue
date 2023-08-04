<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const router = useRouter()
const imageUrl = import.meta.env.VITE_BACKEND_URL

const nameUser = ref()
const renderUser = async () => {
  try {
    const responseRenderUser = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseRenderUser.status == 200) {
      console.log(responseRenderUser.data)
      nameUser.value = responseRenderUser.data.name
    }
  } catch (error) {
    console.log(error)
  }
}

const pets = ref({})
const renderPets = async () => {
  try {
    const responsePets = await axios.get(`/api/pets/home`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responsePets.status == 200) {
      console.log(responsePets.data.data)
      pets.value = responsePets.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const goToDetailKucing = (routePath) => {
  router.push(routePath)
}
const goToListSemuaKucing = (routePath) => {
  router.push(routePath)
}
const goToHalamanTambah = (routePath) => {
  router.push(routePath)
}
const goToHalamanList = (routePath) => {
  router.push(routePath)
}

onMounted(() => {
  renderUser()
  renderPets()
})
</script>

<template>
  <main>
    <h1>
      Hello Admin, <span class="name-user">{{ nameUser }}</span>
    </h1>
    <h2>Selamat Datang</h2>
    <div class="container-logo">
      <img src="../assets/images/lambang_lorem_ipsum_cattery-removebg-preview.png" alt="" />
    </div>

    <h2>List Button Tambah</h2>
    <div class="container-card-tambah">
      <div class="card-detail">
        <button @click="goToHalamanTambah(`/admin/tambah-kucing`)">
          <div class="icon">
            <i class="fa-solid fa-cat fa-2xl"></i>
          </div>
          Tambah Kucing
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanTambah(`/admin/tambah-kategori`)">
          <div class="icon">
            <i class="fa-solid fa-shield-cat fa-2xl"></i>
          </div>
          Tambah Kategori
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanTambah(`/admin/tambah-berita`)">
          <div class="icon">
            <i class="fa-solid fa-bullhorn fa-2xl"></i>
          </div>
          Tambah Berita
        </button>
      </div>
    </div>

    <div class="container-daftar-kucing" v-if="pets.length != 0">
      <h2>List Kucing</h2>
      <div class="container-list-kucing">
        <div
          class="container-detail-kucing"
          v-for="pet in pets"
          :key="pet.id"
          @click="goToDetailKucing(`/admin/pets/${pet.id}`)"
        >
          <img :src="`${imageUrl}${pet.image}`" alt="" />
          <p>Nama: {{ pet.name }}</p>
          <p>Color: {{ pet.color }}</p>
          <p>Category: {{ pet.categories_name }}</p>
          <P class="status-adopt">{{ pet.status_adopt }}</P>
        </div>
      </div>
    </div>

    <button
      class="button-list-kucing"
      @click="goToListSemuaKucing('/list-kucing')"
      v-if="pets.length != 0"
    >
      Lihat Semua Kucing
    </button>

    <h2>List Admin</h2>
    <div class="container-card-list">
      <div class="card-detail">
        <button @click="goToHalamanList(`/admin/list-kucing`)">
          <div class="icon">
            <i class="fa-solid fa-cat fa-2xl"></i>
          </div>
          List Kucing
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanList(`/admin/list-kategori`)">
          <div class="icon">
            <i class="fa-solid fa-shield-cat fa-2xl"></i>
          </div>
          List Kategori
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanList(`/admin/list-berita`)">
          <div class="icon">
            <i class="fa-solid fa-bullhorn fa-2xl"></i>
          </div>
          List Berita
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanList(`/admin/list-form-adopt`)">
          <div class="icon">
            <i class="fa-solid fa-scroll fa-2xl"></i>
          </div>
          List Form Adopt
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanList(`/admin/list-history-adopt`)">
          <div class="icon">
            <i class="fa-solid fa-address-book fa-2xl"></i>
          </div>
          List History Adopt
        </button>
      </div>

      <div class="card-detail">
        <button @click="goToHalamanList(`/admin/chat`)">
          <div class="icon">
            <i class="fa-solid fa-comments fa-2xl"></i>
          </div>
          List Chat User
        </button>
      </div>
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
    .name-user {
      text-transform: capitalize;
    }
  }
  h2 {
    margin-top: 10px;
  }

  .container-logo {
    display: flex;
    justify-content: center;
    img {
      width: 300px;
      height: 300px;
    }
  }

  .container-card-tambah,
  .container-card-list {
    display: grid;
    gap: 10px;
    .card-detail {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #ffd482;
      gap: 10px;
      .icon {
        padding: 20px;
      }
      button {
        padding: 5px;
        border-radius: 10px;
        width: 100%;
        height: 100px;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      }
      button:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #ffd482;
      }
    }
  }

  .container-daftar-kucing {
    .container-list-kucing {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(1, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      .container-detail-kucing {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: #ffd482;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        padding: 10px;
        gap: 5px;
        border-radius: 10px;
        img {
          border-radius: 10px;
          width: 100%;
          height: 300px;
          object-fit: fill;
        }
        p {
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-weight: bolder;
        }
        .status-adopt {
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
          background-color: #85a675;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border-radius: 5px;
          font-size: medium;
          text-transform: capitalize;
        }
      }
    }
  }

  .button-list-kucing {
    margin-top: 10px;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    background-color: #ffd482;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
}

@media only screen and (min-width: 768px) {
  main {
    .container-daftar-kucing {
      .container-list-kucing {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(auto, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        .container-detail-kucing {
          img {
            border-radius: 10px;
            width: 100%;
            height: 300px;
            object-fit: fill;
          }
        }
      }
    }

    .container-card-tambah {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    .container-card-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media only screen and (min-width: 1024px) {
  main {
    .container-daftar-kucing {
      .container-list-kucing {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(auto, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        .container-detail-kucing {
          img {
            border-radius: 10px;
            width: 100%;
            height: 300px;
            object-fit: fill;
          }
        }
      }
    }
    .container-card-tambah {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    .container-card-list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
