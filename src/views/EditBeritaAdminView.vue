<script setup>
import { onMounted, reactive, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const title = ref({})
const image = ref({})
const renameTitle = ref({})
const renameImage = ref({})
const renameDescription = ref({})
const router = useRouter()
const dataBerita = reactive({
  title: renameTitle,
  image: renameImage,
  description: renameDescription
})

const axios = inject('axios')
const token = localStorage.getItem('token')
const route = useRoute()
const itemId = route.params.id
const imageUrl = import.meta.env.VITE_BACKEND_URL
const render = async () => {
  try {
    const responseBerita = await axios.get(`/api/announcements/${itemId}}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
      console.log(responseBerita)
      title.value = responseBerita.data.data.title
      image.value = responseBerita.data.data.image
      renameDescription.value = responseBerita.data.data.description
      renameTitle.value = responseBerita.data.data.title
      renameImage.value = responseBerita.data.data.image
    }
  } catch (error) {
    console.log(error)
  }
}
let file = null
const handleFileChange = (event) => {
  file = event.target.files[0]
}

const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const simpanEdit = async () => {
  sendingFormLoading.value = true
  const formData = new FormData()
  if (file == null) {
    formData.append('title', dataBerita.title)
    formData.append('description', dataBerita.description)
  } else {
    formData.append('image', file)
    formData.append('title', dataBerita.title)
    formData.append('description', dataBerita.description)
  }

  try {
    const responseBerita = await axios.post(`/api/announcements/${itemId}}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
      alert.value = ''
      alertSukses.value = 'SUKSES'
      dataBerita.title = ''
      dataBerita.description = ''
      setTimeout(() => {
        router.push(`/admin/announcements/${itemId}`)
      }, 1000)
    }
    sendingFormLoading.value = false
  } catch (error) {
    console.log(error)
    if (error.response.status == 422) {
      if (dataBerita.title == '' || dataBerita.description == '') {
        alert.value = 'ISI SEMUA FIELD FORM KECUALI IMAGE'
      }
    }
    sendingFormLoading.value = false
  }
}

const goToDetailBerita = () => {
  router.push(`/admin/announcements/${itemId}`)
}
onMounted(() => {
  render()
})
</script>
<template>
  <main>
    <h1>Edit Berita</h1>

    <div class="container-edit">
      <div class="container-judul-image">
        <p>{{ title }}</p>

        <div class="container-image">
          <img :src="`${imageUrl}${image}`" alt="" />
        </div>
      </div>

      <div class="container-rename">
        <div class="alert-message-gagal" v-if="alert != ''">
          <p>{{ alert }}</p>
        </div>
        <div class="alert-message-sukses" v-if="alertSukses != ''">
          <p>{{ alertSukses }}</p>
        </div>
        <label class="label-image" for="img">Upload image</label>
        <input type="file" id="img" name="img" @change="handleFileChange" />
        <label for="">Judul Berita</label>
        <input type="text" v-model="dataBerita.title" />
        <label for="">Description</label>
        <textarea name="" id="" cols="50" rows="10" v-model="dataBerita.description"></textarea>
      </div>

      <div class="container-button">
        <div class="container-button-send">
          <button type="button" @click="simpanEdit()" v-if="sendingFormLoading == false">
            Simpan Edit
          </button>
          <button type="button" v-if="sendingFormLoading == true" disabled>
            <i class="fa-solid fa-spinner fa-xl"></i>
          </button>
        </div>
        <div class="container-button-back">
          <button type="button" @click="goToDetailBerita()">Kembali</button>
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
  .container-edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container-judul-image {
      border: 2px solid #ffd482;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 10px;
      p {
        display: flex;
        justify-content: center;
      }
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
    }
    .container-rename {
      .alert-message-sukses {
        display: flex;
        justify-content: center;
        background-color: rgb(196, 255, 48);
        padding: 5px;
      }
      .alert-message-gagal {
        display: flex;
        justify-content: center;
        background-color: rgb(255, 0, 0);
        padding: 5px;
      }
      display: flex;
      flex-direction: column;
    }
    .container-button {
      display: flex;
      gap: 5px;
      flex-direction: column;
      .container-button-send,
      .container-button-back {
        display: flex;
        justify-content: flex-end;
      }
      .container-button-back {
        button {
          background-color: #fefefe;
        }
      }
      button {
        padding: 5px;
        width: 40%;
        border-radius: 5px;
        background-color: #ffd482;
      }
    }
  }
}
</style>
