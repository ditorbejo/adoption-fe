<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute} from 'vue-router'

const token = localStorage.getItem('token')
const announcement = ref({})
const route = useRoute()
const itemId = route.params.id
const render = async () => {
  try {
    const responseBerita = await axios.get(`http://127.0.0.1:8000/api/announcements/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
      console.log(responseBerita.data.data)
      announcement.value = responseBerita.data.data
    }
  } catch (error) {
    console.log(error)
  }
}



onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>Detail Berita Cattery</h1>

    <div class="container-detail">
      <p class="title">{{ announcement.title }}</p>

      <div class="container-description">
        <img :src="`http://127.0.0.1:8000${announcement.image}`" alt="" />
        <p>Isi Berita:</p>
        <div class="description-detail">
          <textarea class="description" name="" id="" cols="50" rows="10" v-model="announcement.description" disabled></textarea>
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
  max-width: 1920px;
  margin: 0 auto;
  .container-detail {
    display: flex;
    flex-direction: column;
    background-color: #ffd482;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container-description {
      display: flex;
      flex-direction: column;
      gap: 5px;
      img {
        width: 100%;
        max-height: 300px;
        object-fit: fill;
        border-radius: 10px;
      }
      .description-detail {
        overflow: hidden;
        textarea{
          width: 100%;
        }
      }
    }
  }
}
</style>
