<!-- eslint-disable no-empty -->
<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const axios = inject('axios')
const route = useRoute()
const router = useRouter()
const petId = route.params.id
const pets = ref({})
const imageUrl = import.meta.env.VITE_BACKEND_URL
const render = async () => {
  try {
    const responseDetailKucing = await axios.get(`/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDetailKucing.status == 200) {
    
      pets.value = responseDetailKucing.data.data
    }
  } catch (error) {

  }
}
const images = ref({})

const fetchAlbum = async () => {
  try {
    const responseAlbum = await axios.get(`/api/galleries?pet_id=${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseAlbum.status == 200) {

      images.value = responseAlbum.data.data
    }
  } catch (error) {

  }
}

function goToFormAdopt(routePath) {
  router.push(routePath)
}

const askQuestion = () => {
  router.push(`/user/chat?petId=${petId}`)
}

onMounted(() => {
  render()
  fetchAlbum()
})
</script>

<template>
  <main>
    <h1>Detail Kucing User</h1>

    <div class="container-detail">
      <img class="gambar-utama" :src="`${imageUrl}${pets.image}`" alt="" />

      <label for="">Album Photo</label>
      <div class="container-album">
        <div class="container-gambar" v-if="images.length != 0">
          <div class="container-loop-gambar" v-for="image in images" :key="image.id">
            <img class="gambar-album" :src="`${imageUrl}${image.image}`" alt="" />
          </div>
        </div>

        <div class="alert-message" v-else>
          <p>Tidak ada Album Gambar</p>
        </div>
      </div>

      <label for="">Nama</label>
      <p>{{ pets.name }}</p>

      <label for="">Gender</label>
      <p class="gender">{{ pets.gender }}</p>

      <label for="">Certificate</label>
      <p>{{ pets.certificate }}</p>

      <label for="">Color</label>
      <p>{{ pets.color }}</p>

      <label for="">Categories</label>
      <p>{{ pets.categories_name }}</p>

      <label for="">Date Birth</label>
      <p>{{ pets.format_date_birth }}</p>

      <label for="">Weight</label>
      <p>{{ pets.weight }} Kg</p>

      <label for="">Description</label>
      <div class="container-description">
        <textarea
          disabled
          class="description"
          id=""
          cols="50"
          rows="10"
          v-model="pets.description"
        ></textarea>
      </div>

      <label for="">Status Adopt</label>
      <p class="status_adopt" v-if="pets.status_adopt == 'ready'">{{ pets.status_adopt }}</p>
      <p class="status_adopt_adopted" v-else>{{ pets.status_adopt }}</p>
    </div>

    <div class="container-button" v-if="pets.status_adopt == 'ready'">
      <button class="btn-adopt" type="button" @click="goToFormAdopt(`/user/pets/adopt/${petId}`)">
        Adopt
      </button>

      <button class="btn-question" type="button" @click="askQuestion()">Ask a Question</button>
    </div>
    <div class="container-button" v-else></div>
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
  .container-detail {
    display: flex;
    flex-direction: column;
    background-color: #ffd482;
    padding: 10px;
    border-radius: 10px;
    gap: 5px;
    p {
      background-color: azure;
      padding: 5px;
      border-radius: 5px;
    }
    .gambar-utama {
      padding: 10px;
      background-color: #f79327;
      width: 100%;
      max-height: 300px;
      object-fit: fill;
    }
    .gender {
      text-transform: capitalize;
    }
    .container-description {
      .description {
        width: 100%;
        overflow: hidden;
        padding: 10px;
        resize: none;
      }
    }

    .status_adopt {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #85a675;
      text-transform: capitalize;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    .status_adopt_adopted {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(255, 253, 188);
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      text-transform: capitalize;
      
    }
    .container-album {
      display: flex;
      flex-direction: column;
      gap: 5px;
      .container-gambar {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: minmax(1, 3);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        .container-loop-gambar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 5px;
          img {
            width: 100%;
            height: 150px;
            object-fit: fill;
            border: 2px solid #f79327;
          }
          button {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
  .container-button {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    button {
      padding: 5px;
      border-radius: 5px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .btn-adopt {
      border: 2px solid #ffffff;
      background-color: #85a675;
    }
    .btn-question {
      border: 2px solid #ffffff;
      background-color: #ffd482;
    }
  }
}
@media only screen and (min-width: 768px) {
  main {
    .container-detail {
      .gambar-utama {
        padding: 10px;
        background-color: #f79327;
        border-radius: 10px;
        margin: 0 auto;
        width: 100%;
        max-width: 400px;
        height: 400px;
      }
      .container-album {
        .container-gambar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(auto, 1fr);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }
      }
    }
  }
}
@media only screen and (min-width: 1024px) {
  main {
    .container-detail {
      .gambar-utama {
        padding: 10px;
        background-color: #f79327;
        border-radius: 10px;
        margin: 0 auto;
        width: 100%;
        max-width: 400px;
        height: 400px;
      }
      .container-album {
        .container-gambar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(auto, 1fr);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }
      }
    }
  }
}
</style>
