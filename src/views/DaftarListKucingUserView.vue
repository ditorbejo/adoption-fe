<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const pets = ref({})
const render = async () => {
  try {
    const responsePetsByCategory = await axios.get(
      `http://127.0.0.1:8000/api/pets?status_adopt=ready`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responsePetsByCategory.status == 200) {
      console.log(responsePetsByCategory.data.data)
      pets.value = responsePetsByCategory.data.data
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
  render()
})
</script>

<template>
  <main>
    <h1>List Kucing</h1>

    <div class="list-form-kosong" v-if="pets.length == 0">
      <p>Kucing Belum Ditambahkan</p>
    </div>

    <div class="container-list" v-else>
      <div
        class="container-detail"
        v-for="pet in pets"
        :key="pet.id"
        @click="goToDetail(`/user/pets/${pet.id}`)"
      >
        <img :src="`http://127.0.0.1:8000${pet.image}`" alt="" />

        <p>Nama: {{ pet.name }}</p>
        <p>Color: {{ pet.color }}</p>
        <p>Category: {{ pet.categories_name }}</p>
        <p class="status-adopt">{{ pet.status_adopt }}</p>
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
  h1 {
    margin-bottom: 25px;
  }

  .list-form-kosong {
    margin-top: 5%;
    background-color: #ffd482;
    padding: 10px;
    border-radius: 10px;
    p {
      display: flex;
      text-transform: capitalize;
      align-items: center;
      justify-content: center;
    }
  }
  .container-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container-detail {
      display: flex;
      flex-direction: column;
      background-color: #ffd482;
      padding: 10px;
      gap: 5px;
      border-radius: 10px;
      img {
        border-radius: 10px;
        width: 100%;
        max-height: 300px;
        object-fit: fill;
      }
      .status-adopt {
        background-color: #85a675;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-size: medium;
        text-transform: capitalize;
      }
    }
  }
}
</style>
