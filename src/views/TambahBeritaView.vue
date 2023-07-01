<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const dataBerita = reactive({
  title: '',
  description: ''
})
const token = localStorage.getItem('token')
let file = null

const handleFileChange = (event) => {
  file = event.target.files[0]
}

async function submit() {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('title', dataBerita.title)
  formData.append('description', dataBerita.description)
  try {
    const responseBerita = await axios.post('http://127.0.0.1:8000/api/announcements', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseBerita.status == 200) {
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Mendaftarkan Berita</p>`
      dataBerita.title = ''
      dataBerita.description = ''
    }
  } catch (error) {
    console.log(error)
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = `<p style="color:red;"> Isi semua field yang ada</p>`
  }
}
</script>

<template>
  <main class="tambah-berita">
    <h1>Form Berita Kucing</h1>

    <div class="container-form">
      <p>Upload Thumbnail Berita</p>

      <div class="alert-message"></div>

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
        <button id="button" type="submit" @click="submit()">Tambah Berita</button>
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
      input {
        height: 100px;
        width: 100%;
      }
    }
    .container-button {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
