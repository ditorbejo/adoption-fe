<script setup>
import { onMounted, ref ,inject} from 'vue'
import { useRoute } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const announcement = ref({})
const route = useRoute()
const itemId = route.params.id
const imageUrl = import.meta.env.VITE_BACKEND_URL
const render = async () => {
  try {
    const responseBerita = await axios.get(`/api/announcements/${itemId}`, {
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
        <div class="container-image">
          <img :src="`${imageUrl}${announcement.image}`" alt="" />
        </div>

        <p>Isi Berita:</p>
        <div class="description-detail">
          <textarea
            class="description"
            name=""
            id=""
            cols="50"
            rows="10"
            v-model="announcement.description"
            disabled
          ></textarea>
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
  max-width: 1200px;
  margin: 50px auto 0 auto;
  .container-detail {
    display: flex;
    flex-direction: column;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border: 2px solid #ffd482;
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
      .container-image {
        display: flex;
        justify-content: center;
        img {
          width: 300px;
          height: 300px;
          object-fit: fill;
          border-radius: 10px;
          padding: 10px;
          background-color: #f79327;
        }
      }
      .description-detail {
        overflow: hidden;
        .description {
          padding: 10px;
          width: 100%;
          overflow: hidden;
          resize: none;
        }
      }
    }
  }
}
</style>
