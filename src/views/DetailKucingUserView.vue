<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const route = useRoute()
const router = useRouter()
const petId = route.params.id
const pets = ref({})
const render = async () => {
  try {
    const responseDetailKucing = await axios.get(`http://127.0.0.1:8000/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDetailKucing.status == 200) {
      console.log(responseDetailKucing.data.data)
      pets.value = responseDetailKucing.data.data
    //   if (pets.value.status_adopt == 'adopted') {
    //     const statusAdopt = document.querySelector('.status_adopt')
    //     statusAdopt.style.backgroundColor = 'red'
    //     const buttonAdopt = document.querySelector('.container-button')
    //     buttonAdopt.innerHTML = ''
    //   }
    }
  } catch (error) {
    console.log(error)
  }
}
const images = ref({})

const fetchAlbum = async () => {
  try {
    const responseAlbum = await axios.get(`http://127.0.0.1:8000/api/galleries?pet_id=${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseAlbum.status == 200) {
      console.log(responseAlbum.data.data)
      images.value = responseAlbum.data.data
      if (images.value.length == 0) {
        const alertContainer = document.querySelector('.alert-message')
        alertContainer.innerHTML = `
        <p>Tidak ada Album Gambar</p>
        <style>
        p{
            background-color: #D9D9D9;
            padding: 5px;
            border-radius: 5px;
        }
        </style>
        `
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function goToFormAdopt(routePath) {
  router.push(routePath)
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
      <img class="gambar-utama" :src="`http://127.0.0.1:8000${pets.image}`" alt="" />

      <label for="">Album Photo</label>
      <div class="container-album">
        <div class="alert-message"></div>

        <div class="container-gambar">
          <div class="container-loop-gambar" v-for="image in images" :key="image.id">
            <img class="gambar-album" :src="`http://127.0.0.1:8000${image.image}`" alt="" />
          </div>
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
      <p>{{ pets.categories_id }}</p>

      <label for="">Date Birth</label>
      <p>{{ pets.date_birth }}</p>

      <label for="">Weight</label>
      <p>{{ pets.weight }}</p>

      <label for="">Description</label>
      <textarea
        disabled
        class="description"
        id=""
        cols="50"
        rows="10"
        v-model="pets.description"
      ></textarea>

      <label for="">Status Adopt</label>
      <p class="status_adopt" v-if="pets.status_adopt == 'ready'">{{ pets.status_adopt }}</p>
      <p class="status_adopt_adopted" v-else>{{ pets.status_adopt }}</p>
    </div>

    <div  class="container-button" v-if="pets.status_adopt == 'ready'">
      <button class="btn-adopt" type="button" @click="goToFormAdopt(`/user/pets/adopt/${petId}`)">
        Adopt
      </button>

      <button class="btn-question" type="button" @click="goToDelete()">Ask a Question</button>
    </div>
    <div  class="container-button" v-else>
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
  max-width: 1920px;
  margin: 0 auto;
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
      width: 100%;
      max-height: 300px;
      object-fit: fill;
    }
    .gender {
      text-transform: capitalize;
    }
    .description {
      overflow: hidden;
    }
    .status_adopt {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #85a675;
      text-transform: capitalize;
    }
    .status_adopt_adopted {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
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
          background-color: azure;
          img {
            width: 100%;
            height: 100px;
            object-fit: fill;
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
      background-color: #85a675;
    }
    .btn-question {
      background-color: #ffd482;
    }
  }
}
</style>
