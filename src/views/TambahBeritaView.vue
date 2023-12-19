<script setup>
import { reactive, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const dataBerita = reactive({
  title: '',
  description: ''
})
const token = localStorage.getItem('token')
let file = null

const handleFileChange = (event) => {
  file = event.target.files[0]
}
const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const submit = async () => {
  sendingFormLoading.value = true
  const formData = new FormData()
  formData.append('image', file)
  formData.append('title', dataBerita.title)
  formData.append('description', dataBerita.description)
  try {
    const responseBerita = await axios.post('/api/announcements', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
      alert.value = ''
      alertSukses.value = 'SUKSES MENAMBAHKAN BERITA'
      dataBerita.title = ''
      dataBerita.description = ''
      setTimeout(() => {
        router.push('/admin/list-berita')
      }, 1000)
    }
    sendingFormLoading.value = false
  } catch (error) {
    if (error.response.status == 422) {
      if (dataBerita.title == '' || dataBerita.description == '' || file == null) {
        alert.value = 'ISI SEMUA FIELD FORM'
      }
    }
    sendingFormLoading.value = false
  }
}

const router = useRouter()
function goToListBerita(routePath) {
  router.push(routePath)
}
</script>

<template>
  <main class="tambah-berita">
    <h1>Form Berita Kucing</h1>

    <div class="container-form">
      <p>Upload Thumbnail Berita</p>

      <div class="alert-message-gagal" v-if="alert != ''">
        <p>{{ alert }}</p>
      </div>
      <div class="alert-message-sukses" v-if="alertSukses != ''">
        <p>{{ alertSukses }}</p>
      </div>

      <label class="label-image" for="img">Upload image</label>
      <input type="file" id="img" name="img" @change="handleFileChange" />

      <label for="judul">Judul Berita</label>
      <input
        type="text"
        id="judul"
        name="judul"
        placeholder="Tulis Judul Berita"
        v-model="dataBerita.title"
      />

      <label for="description">Description</label>
      <div class="container-input">
        <textarea name="" id="" cols="50" rows="10" v-model="dataBerita.description"></textarea>
      </div>

      <div class="container-button">
        <button id="button" type="submit" @click="submit()" v-if="sendingFormLoading == false">
          Tambah Berita
        </button>
        <button id="button" v-if="sendingFormLoading == true" disabled>
          <i class="fa-solid fa-spinner fa-xl"></i>
        </button>
      </div>
      <div class="container-button">
        <button class="button-back" type="button" @click="goToListBerita('/admin/list-berita')">
          Ke Halaman List Berita
        </button>
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
  margin: 50px auto 0 auto;
  max-width: 1200px;
  .container-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 5px;
    input,
    button {
      border-radius: 10px;
      padding: 10px;
    }
    button {
      width: 250px;
      background-color: #ffd482;
    }
    .label-image {
      border: 1px;
      border-style: solid;
      border-radius: 5px;
      width: 45%;
      padding: 5px;
      background-color: #afb1b6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container-input {
      display: flex;
      overflow-y: hidden;
      max-height: 200px;
      textarea {
        width: 100%;
      }
    }
    .container-button {
      display: flex;
      justify-content: flex-end;
      .button-back{
        background-color: #EFEFF0;
      }
    }
  }
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
}
</style>
