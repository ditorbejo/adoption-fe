<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const announcements = ref({})
const render = async () => {
  try {
    const responseBerita = await axios.get('http://127.0.0.1:8000/api/announcements', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
      console.log(responseBerita.data.data)
      announcements.value = responseBerita.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
function goDetail(routePath) {
  router.push(routePath)
}
onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>List Berita Cattery</h1>

    <div class="container-list">
      <div
        class="box-list"
        v-for="announcement in announcements"
        :key="announcement.id"
        @click="goDetail(`/admin/announcements/${announcement.id}`)"
      >
        <p class="title-berita">{{ announcement.title }}</p>

        <div class="container-description">
          <img :src="`http://127.0.0.1:8000${announcement.image}`" alt="" />
          <p>{{ announcement.description }}</p>
        </div>
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
  .container-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .box-list {
      background-color: #ffd482;
      border-radius: 10px;
      padding: 20px;
      .title-berita {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }
      .container-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        img {
          border-radius: 10px;
          width: 100%;
          max-height: 300px;
          object-fit: fill;
        }
        p {
          width: 100%;
          height: 100%;
          padding: 5px 10px;
          background-color: azure;
          white-space: pre;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
