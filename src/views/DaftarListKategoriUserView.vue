<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const categories = ref({})
const render = async () => {
  try {
    const responseCategory = await axios.get(`/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseCategory.status == 200) {
      console.log(responseCategory.data.data)
      categories.value = responseCategory.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
function goToCategory(routePath) {
  router.push(routePath)
}

onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>List Kategori Kucing</h1>

    <div class="attention" v-if="categories.length != 0">
      <p>Pilih salah satu kategori</p>
    </div>

    <div class="list-form-kosong" v-if="categories.length == 0">
      <p>DATA BELUM DITAMBAHKAN</p>
    </div>

    <div class="container-list" v-if="categories.length != 0">
      <div
        class="container-category"
        v-for="category in categories"
        :key="category.id"
        @click="goToCategory(`/category/${category.id}`)"
      >
        <p>{{ category.namecategory }}</p>
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
    margin-bottom: 15px;
  }

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
  .container-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container-category {
      border: 2px solid #ffd482;
      display: flex;
      justify-content: center;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    .container-category:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
}
</style>
