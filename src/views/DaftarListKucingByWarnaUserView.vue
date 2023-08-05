<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const listWarna = ref([])
const imageUrl = import.meta.env.VITE_BACKEND_URL
const renderKucing = async () => {
  try {
    const responseRenderWarna = await axios.get('/api/getAllColor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseRenderWarna.status == 200) {
      listWarna.value = responseRenderWarna.data.data
      console.log(responseRenderWarna.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const listKucingByWarna = ref([])
const renderKucingByColor = async (warnaKucing) => {
  try {
    const responseRenderKucing = await axios.get(
      `/api/pets?color=${warnaKucing}&&status_adopt=ready`,
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
    <h1>Kucing Berdasarkan Warna</h1>

    <div class="attention" v-if="listWarna.length != 0">
      <p>Pilih salah satu warna</p>
    </div>

    <div class="list-form-kosong" v-if="listWarna.length == 0">
      <p>KUCING BELUM DITAMBAHKAN</p>
    </div>

    <div class="container-list-color" v-else>
      <div class="list-color" v-for="color in listWarna" :key="color.id">
        <button @click="renderKucingByColor(color.color)">{{ color.color }}</button>
      </div>
    </div>

    <div class="container-list-kucing">
      <div
        class="list-kucing-by-color"
        v-for="pet in listKucingByWarna"
        :key="pet.id"
        @click="goToDetail(`/pets/${pet.id}`)"
      >
        <div class="container-image">
          <img :src="`${imageUrl}${pet.image}`" alt="" />
        </div>

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

  .attention {
    padding: 10px;
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
  .container-list-color {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    .list-color {
      button {
        width: 100px;
        background-color: #ffd482;
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
  }

  .container-list-kucing {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 10px;
    .list-kucing-by-color {
      display: flex;
      flex-direction: column;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      background-color: #ffd482;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      gap: 5px;
      .container-image {
        display: flex;
        padding: 5px;
        justify-content: center;
        img {
          border-radius: 10px;
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
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
    .container-list-kucing {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      .list-kucing-by-color {
        .container-image {
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
}

@media only screen and (min-width: 1024px) {
  main {
    .container-list-kucing {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      .list-kucing-by-color {
        .container-image {
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
}
</style>
