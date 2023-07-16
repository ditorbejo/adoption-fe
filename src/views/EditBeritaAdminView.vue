<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const title = ref({})
const image = ref({})
const renameTitle = ref({})
const renameImage = ref({})
const renameDescription = ref({})
const dataBerita = reactive({
  title: renameTitle,
  image: renameImage,
  description: renameDescription
})

const token = localStorage.getItem('token')
const route = useRoute()
const itemId = route.params.id
const render = async () => {
  try {
    const responseBerita = await axios.get(`http://127.0.0.1:8000/api/announcements/${itemId}}`, {
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

const simpanEdit = async () => {
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
    const responseBerita = await axios.post(
      `http://127.0.0.1:8000/api/announcements/${itemId}}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseBerita.status == 200) {
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Menyimpan Update Berita</p>`
      dataBerita.title = ''
      dataBerita.description = ''
      console.log(file)
    }
  } catch (error) {
    console.log(error)
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = `<p style="color:red;">Field tidak boleh kosong kecuali image</p>`
  }
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

        <img :src="`http://127.0.0.1:8000${image}`" alt="" />
      </div>

      <div class="container-rename">
        <div class="alert-message"></div>
        <label class="label-image" for="img">Upload image</label>
        <input type="file" id="img" name="img" @change="handleFileChange" />
        <label for="">Judul Berita</label>
        <input type="text" v-model="dataBerita.title" />
        <label for="">Description</label>
        <textarea name="" id="" cols="50" rows="10" v-model="dataBerita.description"></textarea>
      </div>

      <div class="container-button">
        <button type="button" @click="simpanEdit()">Simpan Edit</button>
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
  .container-edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .container-judul-image {
      background-color: #ffd482;
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 10px;
      p {
        display: flex;
        justify-content: center;
      }
      img {
        width: 100%;
        max-height: 300px;
        object-fit: fill;
      }
    }
    .container-rename {
      display: flex;
      flex-direction: column;
    }
    .container-button {
      display: flex;
      button {
        padding: 5px;
        width: 100%;
        border-radius: 5px;
        background-color: #ffd482;
      }
    }
  }
}
</style>
