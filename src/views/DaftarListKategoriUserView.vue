<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const categories = ref({})
const render = async () => {
  try {
    const responseCategory = await axios.get(`http://127.0.0.1:8000/api/categories`, {
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
const router = useRouter();
function goToCategory (routePath){
    router.push(routePath)
}

onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>List Kategori Ras Kucing</h1>

    <div class="container-list">
      <div class="container-category" v-for="category in categories" :key="category.id" @click="goToCategory(`/user/category/${category.id}`)">
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
  max-width: 1920px;
  margin: 0 auto;
  h1{
    margin-bottom: 5%;
  }
  .container-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container-category{
        background-color: #FFD482;
        display: flex;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    .container-category:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
}
</style>
