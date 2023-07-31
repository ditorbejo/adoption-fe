<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const pets = ref({})
const render = async () => {
  try {
    const responsePets = await axios.get(`http://127.0.0.1:8000/api/pets?status_adopt=ready`, {
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
const router = useRouter()

function goToTambahKucing(routePath) {
  router.push(routePath)
}

function goToDetail(routePath) {
  router.push(routePath)
}
onMounted(async () => {
  await render()
})
</script>

<template>
  <main>
    <h1>List Kucing</h1>
    <button class="button-tambah-kucing" @click="goToTambahKucing('/admin/tambah-kucing')">
      Tambah Kucing
    </button>

    <div class="list-form-kosong" v-if="pets.length == 0">
      <p>Belum ada kucing yang ditambahkan</p>
    </div>

    <div class="container-list" v-else>
      <div
        class="container-detail"
        v-for="pet in pets"
        :key="pet.id"
        @click="goToDetail(`/admin/pets/${pet.id}`)"
      >
        <img :src="`http://127.0.0.1:8000${pet.image}`" alt="" />

        <p>Nama: {{ pet.name }}</p>
        <p>Color: {{ pet.color }}</p>
        <p>Category: {{ pet.categories_name }}</p>
        <p class="status-adopt" v-if="pet.status_adopt == 'ready'">{{ pet.status_adopt }}</p>
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
  .button-tambah-kucing {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    background-color: #ffe569;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  button:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .list-form-kosong {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5%;
    padding: 10px;
    p {
      padding: 10px;
      border-radius: 10px;
      display: flex;
      background-color: #ffd482;
      text-transform: capitalize;
      align-items: center;
      justify-content: center;
    }
    button {
      padding: 10px;
      border-radius: 10px;
      display: flex;
      background-color: #bff878;
      text-transform: capitalize;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      background-color: #ffd482;
      padding: 10px;
      gap: 5px;
      border-radius: 10px;
      img {
        border-radius: 10px;
        width: 100%;
        height: 300px;
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
        padding: 5px;
      }
    }
  }
}
@media only screen and (min-width: 768px) {
  main {
    .container-list {
      display: grid;
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
