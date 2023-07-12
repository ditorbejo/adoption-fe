<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const listWarna = ref([])
const renderKucing = async () => {
  try {
    const responseRenderWarna = await axios.get(
      'http://127.0.0.1:8000/api/pets?status_adopt=ready',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseRenderWarna.status == 200) {
      const mapColor = responseRenderWarna.data.data.map((item) => {
        return {
          color: item.color
        }
      })
      listWarna.value = mapColor
    }
  } catch (error) {
    console.log(error)
  }
}

const listKucingByWarna = ref([])
const renderKucingByColor = async (warnaKucing) => {
  try {
    const responseRenderKucing = await axios.get(
      `http://127.0.0.1:8000/api/pets?color=${warnaKucing}&&status_adopt=ready`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseRenderKucing.status == 200) {
      console.log(responseRenderKucing.data.data)
      listKucingByWarna.value = responseRenderKucing.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const router = useRouter()
function goToDetail(routePath) {
  router.push(routePath)
}

onMounted(() => {
  renderKucing()
})
</script>

<template>
  <main>
    <h1>Ini adalah Halaman Kucing By Warna</h1>
    <div class="list-color" v-for="color in listWarna" :key="color.id">
      <button @click="renderKucingByColor(color.color)">{{ color.color }}</button>
    </div>

    <div class="container-list-kucing">
      <div
        class="list-kucing-by-color"
        v-for="pet in listKucingByWarna"
        :key="pet.id"
        @click="goToDetail(`/pets/${pet.id}`)"
      >
        <img :src="`http://127.0.0.1:8000${pet.image}`" alt="" />

        <p>Nama: {{ pet.name }}</p>
        <p>Color: {{ pet.color }}</p>
        <p>Category: {{ pet.categories_name }}</p>
        <p class="status-adopt-ready">{{ pet.status_adopt }}</p>
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
  max-width: 1920px;
  margin: 0 auto;
  .list-color {
    margin-top: 5%;
    display: flex;
    width: 100%;
    button {
      background-color: #ffd482;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
  .container-list-kucing {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .list-kucing-by-color {
      display: flex;
      flex-direction: column;
      background-color: #ffd482;
      padding: 10px;
      border-radius: 10px;
      gap: 5px;
      img {
        width: 100%;
        height: 300px;
        object-fit: fill;
        border-radius: 10px;
      }
      .status-adopt-ready {
        background-color: #85a675;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 5px;
        font-size: medium;
        text-transform: capitalize;
      }
    }
  }
}
</style>
