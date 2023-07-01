<script setup>
import { onMounted,  ref } from 'vue'
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

onMounted(() => {
  getDataCategory()
})
</script>

<template>
  <main>
    <h1>List Kategori Ras Kucing</h1>
    
    <div class="container-list">
      <div class="box-list" v-for="category in categories" :key="category.id" @click="goDetail(`/admin/category/${category.id}`)">
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
  h1 {
    margin-bottom: 25px;
  }
  .container-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .box-list {
    display: flex;
    background-color: #ffd482;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
  }
  .box-list:hover{
    cursor: pointer;
    opacity: 80%;
  }
}
</style>
