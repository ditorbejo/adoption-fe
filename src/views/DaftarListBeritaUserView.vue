<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const announcements = ref({})
const imageUrl = import.meta.env.VITE_BACKEND_URL
const render = async () => {
  try {
    const responseBerita = await axios.get('/api/announcements', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
     
      announcements.value = responseBerita.data.data
    }
  } catch (error) {

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

    <div class="list-form-kosong" v-if="announcements.length == 0">
      <p>DATA BELUM DITAMBAHKAN</p>
    </div>

    <div class="container-list">
      <div
        class="box-list"
        v-for="announcement in announcements"
        :key="announcement.id"
        @click="goDetail(`/announcements/${announcement.id}`)"
      >
        <p class="title-berita">{{ announcement.title }}</p>

        <div class="container-description">
          <img :src="`${imageUrl}${announcement.image}`" alt="" />
          <textarea
            name=""
            id=""
            class="description"
            cols="50"
            rows="10"
            v-model="announcement.description"
            disabled
          ></textarea>
        </div>
        <div class="detail-berita-button">
          <button @click="goDetail(`/announcements/${announcement.id}`)">Detail Berita</button>
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

    .box-list {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      border: 2px solid #ffd482;
      border-radius: 10px;
      padding: 20px;
      cursor: pointer;
      .title-berita {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }
      .container-description {
        display: flex;
        flex-direction: column;
        gap: 5px;
        img {
          border: 2px solid #f79327;
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 10px;
        }
        .description {
          padding: 10px;
          width: 100%;
          overflow: hidden;
          resize: none;
        }
      }
      .detail-berita-button {
        margin-top: 5px;
        button {
          width: 100%;
          padding: 5px;
          cursor: pointer;
          background-color: rgb(255, 253, 188);
          border: 1px solid #ffd482;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }
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
