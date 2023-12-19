<script setup>
import { onMounted, ref ,inject} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const announcement = ref({})
const route = useRoute()
const router = useRouter()
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
    
      announcement.value = responseBerita.data.data
    }
  } catch (error) {

  }
}

const goToDelete = async () => {
  try {
    const responseDelete = await axios.delete(`/api/announcements/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {

      router.push('/admin/list-berita')
    }
  } catch (error) {

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

    <div class="container-edit-delete">
      <button type="button" class="edit" @click="goToEdit(`/admin/announcements/edit/${itemId}`)">
        Edit
      </button>

      <button type="button" class="delete" @click="goToDelete()">Hapus</button>
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
          border: 2px solid #f79327;
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
    .edit {
      background-color: #9bb05d;
    }
    .delete {
      background-color: #ff3c3c;
    }
  }
}
</style>
