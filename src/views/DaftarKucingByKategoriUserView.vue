<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const route = useRoute()
const itemId = route.params.id
const pets = ref({})
const render = async () => {
  try {
    const responsePetsByCategory = await axios.get(
      `/api/pets?categories_id=${itemId}&status_adopt=ready`,
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

const nameCategory = ref('')
const renderCategoryName = async () => {
  try {
    const responseCategory = await axios.get(`/api/categories/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseCategory.status == 200) {
      console.log(responseCategory.data.data)
      nameCategory.value = responseCategory.data.data.namecategory
    }
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
const imageUrl = import.meta.env.VITE_BACKEND_URL

function goToDetail(routePath) {
  router.push(routePath)
}

onMounted(() => {
  renderCategoryName()
  render()
})
</script>

<template>
  <main>
    <h1>{{ nameCategory }}</h1>

    <div class="list-kucing-kosong" v-if="pets.length == 0">
      <p>DATA BELUM DITAMBAHKAN</p>
    </div>

    <div class="container-list" v-else>
      <div
        class="container-detail"
        v-for="pet in pets"
        :key="pet.id"
        @click="goToDetail(`/pets/${pet.id}`)"
      >
        <img :src="`${imageUrl}${pet.image}`" alt="" />

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
      cursor: pointer;
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
      p {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bolder;
      }
      .status-adopt-ready {
        background-color: #85a675;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
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
