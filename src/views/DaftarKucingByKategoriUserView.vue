<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const route = useRoute()
const itemId = route.params.id
const pets = ref({})
const render = async () => {
  try {
    const responsePetsByCategory = await axios.get(
      `http://127.0.0.1:8000/api/pets?categories_id=${itemId}&status_adopt=ready`,
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
    <h1>Daftar Kucing by Category</h1>

    <div class="list-kucing-kosong" v-if="pets.length == 0">
      <p>Tidak ada kucing yang tersedia</p>
    </div>

    <div class="container-list" v-else>
      <div
        class="container-detail"
        v-for="pet in pets"
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
  max-width: 1200px;
  margin: 50px auto 0 auto;
  h1 {
    margin-bottom: 25px;
  }
  .list-kucing-kosong {
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
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    .container-detail {
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
@media only screen and (min-width: 768px) {
  main {
    .container-list {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      .container-detail {
        img {
          border-radius: 10px;
          width: 100%;
          height: 300px;
          object-fit: fill;
        }
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  main {
    .container-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      .container-detail {
        img {
          border-radius: 10px;
          width: 100%;
          height: 300px;
          object-fit: fill;
        }
      }
    }
  }
}
</style>
