<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import router from '../router';

const options = ref([])
const dataTambahKucing = reactive({
  name: '',
  gender: '',
  status_adopt: '',
  certificate: '',
  color: '',
  categories_id: '',
  date_birth: '',
  weight: '',
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
  formData.append('name', dataTambahKucing.name)
  formData.append('gender', dataTambahKucing.gender)
  formData.append('status_adopt', dataTambahKucing.status_adopt)
  formData.append('certificate', dataTambahKucing.certificate)
  formData.append('color', dataTambahKucing.color)
  formData.append('categories_id', dataTambahKucing.categories_id)
  formData.append('date_birth', dataTambahKucing.date_birth)
  formData.append('weight', dataTambahKucing.weight)
  formData.append('description', dataTambahKucing.description)
  try {
    const responseTambahKucing = await axios.post('http://127.0.0.1:8000/api/pets', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseTambahKucing.status == 200) {
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Mendaftarkan TambahKucing</p>`
      dataTambahKucing.name = ''
      dataTambahKucing.gender = ''
      dataTambahKucing.status_adopt = ''
      dataTambahKucing.certificate = ''
      dataTambahKucing.color = ''
      dataTambahKucing.categories_id = ''
      dataTambahKucing.date_birth = ''
      dataTambahKucing.weight = ''
      dataTambahKucing.description = ''
      router.push('/admin/list-kucing')
    }
  } catch (error) {
    console.log(error)
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = `<p style="color:red;"> Isi semua field yang ada</p>`
  }
}

const getDataCategory = async () => {
  try {
    const responseCategory = await axios.get('http://127.0.0.1:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    options.value = responseCategory.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getDataCategory()
})
</script>

<template>
  <main class="tambah-kucing">
    <h1>Form Tambah Kucing</h1>

    <div class="container-form">
      <div class="alert-message"></div>

      <label for="name">Nama Kucing</label>
      <input type="text" placeholder="Masukkan Nama Kucing" v-model="dataTambahKucing.name" />

      <label for="">Gender</label>
      <select name="gender" v-model="dataTambahKucing.gender">
        <option value="">Pilih Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label for="">Status Adopt</label>
      <select id="status_adopt" name="status_adopt" v-model="dataTambahKucing.status_adopt">
        <option value="">Pilih Option</option>
        <option value="ready">Ready</option>
        <option value="adopted">Adopted</option>
      </select>

      <label for="certificate">Certificate</label>
      <input type="text" placeholder="Certificate" v-model="dataTambahKucing.certificate" />

      <label for="color">Color</label>
      <input type="text" placeholder="Color" v-model="dataTambahKucing.color" />

      <label for="">Categories</label>
      <select v-model="dataTambahKucing.categories_id">
        <option value="">Pilih Kategori</option>
        <option v-for="option in options" :value="option.id" :key="option.id">
          {{ option.namecategory }}
        </option>
      </select>

      <label for="date_birth">Date Birth</label>
      <input type="date" v-model="dataTambahKucing.date_birth" />

      <label for="weight">Weight</label>
      <input type="text" placeholder="Weight" v-model="dataTambahKucing.weight" />

      <label for="description">Description</label>
      <textarea name="" id="" cols="50" rows="10" v-model="dataTambahKucing.description"></textarea>

      <label for="">Upload Image</label>
      <input type="file" id="img" name="img" @change="handleFileChange" />

      <div class="button-container">
        <button type="button" @click="submit()">Tambah Kucing</button>
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
  .container-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    input {
      padding: 5px;
    }
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    button {
      padding: 10px;
      background-color: #ffd482;
      border-radius: 10px;
    }
    button:hover {
      opacity: 70%;
    }
  }
}
</style>
