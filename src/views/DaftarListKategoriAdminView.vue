<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const categories = ref({})
const token = localStorage.getItem('token')

const getDataCategory = async () => {
  try {
    const responseCategory = await axios.get('http://127.0.0.1:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    categories.value = responseCategory.data.data
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
function goDetail(routePath) {
  router.push(routePath)
}

function goToTambahKategori(routePath) {
  router.push(routePath)
}

onMounted(() => {
  getDataCategory()
})
</script>

<template>
  <main>
    <h1>List Kategori Ras Kucing</h1>

    <button class="button-tambah-kategori" @click="goToTambahKategori('/admin/tambah-kategori')">
      Tambah Kategori Ras
    </button>

    <div class="list-form-kosong" v-if="categories.length == 0">
      <p>Belum ada kategori kucing</p>
    </div>

    <div class="container-list" v-else>
      <div
        class="box-list"
        v-for="category in categories"
        :key="category.id"
        @click="goDetail(`/admin/category/${category.id}`)"
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
    margin-bottom: 25px;
  }
  .button-tambah-kategori {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    background-color: #ffe569;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  .button-tambah-kategori:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
    gap: 5px;
  }
  .box-list {
    display: flex;
    border: 2px solid #ffd482;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  .box-list:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
}
</style>
