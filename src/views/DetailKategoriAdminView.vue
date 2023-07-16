<script setup>
const token = localStorage.getItem('token')
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const nama = ref({})
const route = useRoute()
const router = useRouter()
const itemId = route.params.id

const render = async () => {
  try {
    const responseDetail = await axios.get(`http://127.0.0.1:8000/api/categories/${itemId}}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDetail.status == 200) {
      nama.value = responseDetail.data.data.namecategory
    }
  } catch (error) {
    console.log(error)
  }
}

const goToDelete = async () => {
  try {
    const responseDelete = await axios.delete(`http://127.0.0.1:8000/api/categories/${itemId}}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {
      console.log(responseDelete)
      router.push('/admin/list-kategori')
    }
  } catch (error) {
    console.log(error)
  }
}

const goToEdit = (routePath) => {
  router.push(routePath)
}

onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>Detail Kategori Ras Kucing</h1>
    <div class="container-detail">
      <p class="label-nama">Nama Ras Kucing</p>
      <p class="nama-category">{{ nama }}</p>
    </div>

    <div class="container-edit-delete">
      <button type="button" class="btn-edit" @click="goToEdit(`/admin/category/edit/${itemId}`)">
        Edit
      </button>
      
      <button type="button" class="btn-delete" @click="goToDelete()">Delete</button>
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
  margin: 0 auto;
  max-width: 1920px;
  h1 {
    margin-bottom: 25px;
  }
  .container-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
    .nama-category {
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      padding: 5px;
    }
  }
  .container-edit-delete {
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    gap: 5px;
    button {
      padding: 5px;
      border-radius: 5px;
    }
    button:hover {
      opacity: 80%;
    }
    .btn-edit {
      background-color: #9bb05d;
    }
    .btn-delete {
      background-color: #ff3c3c;
    }
  }
}
</style>
