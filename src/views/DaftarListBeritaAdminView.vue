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

const goToTambahBerita = (routePath) => {
  router.push(routePath)
}
onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>List Berita Cattery</h1>
    <button class="button-tambah-berita" @click="goToTambahBerita('/admin/tambah-berita')">
      Tambah Berita
    </button>

    <div class="list-form-kosong" v-if="announcements.length == 0">
      <p>Belum ada berita informasi cattery</p>
    </div>

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
  margin: 50px auto 0 auto;
  .button-tambah-berita {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    background-color: #ffe569;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  button:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .list-form-kosong {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5%;
    padding: 10px;
    p {
      padding: 10px;
      border-radius: 10px;
      display: flex;
      background-color: #ffd482;
      text-transform: capitalize;
      align-items: center;
      justify-content: center;
    }
    button {
      padding: 10px;
      border-radius: 10px;
      display: flex;
      background-color: #bff878;
      text-transform: capitalize;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
  .container-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .box-list {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      border: 2px solid #ffd482;
      cursor: pointer;
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
        gap: 10px;
        img {
          padding: 10px;
          background-color: #f79327;
          width: 100%;
          height: 300px;
          object-fit: fill;
          border-radius: 10px;
        }
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
