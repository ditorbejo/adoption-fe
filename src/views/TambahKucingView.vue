<script setup>
import { onMounted, reactive, ref, inject } from 'vue'
import router from '../router'

const axios = inject('axios')
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

const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const submit = async () => {
  sendingFormLoading.value = true
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
    const responseTambahKucing = await axios.post('/api/pets', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseTambahKucing.status == 200) {
      alert.value = ''
      alertSukses.value = 'SUKSES MENAMBAHKAN KUCING'
      dataTambahKucing.name = ''
      dataTambahKucing.gender = ''
      dataTambahKucing.status_adopt = ''
      dataTambahKucing.certificate = ''
      dataTambahKucing.color = ''
      dataTambahKucing.categories_id = ''
      dataTambahKucing.date_birth = ''
      dataTambahKucing.weight = ''
      dataTambahKucing.description = ''
      setTimeout(() => {
        router.push('/admin/list-kucing')
      }, 1000)
    }
    sendingFormLoading.value = false
  } catch (error) {
    console.log(error)
    if (error.response.status == 422) {
      if (
        file == null ||
        dataTambahKucing.name == '' ||
        dataTambahKucing.gender == '' ||
        dataTambahKucing.status_adopt == '' ||
        dataTambahKucing.certificate == '' ||
        dataTambahKucing.color == '' ||
        dataTambahKucing.categories_id == '' ||
        dataTambahKucing.date_birth == '' ||
        dataTambahKucing.weight == '' ||
        dataTambahKucing.description == ''
      ) {
        alert.value = 'ISI SEMUA FIELD FORM'
      }
    }
    sendingFormLoading.value = false
  }
}

const getDataCategory = async () => {
  try {
    const responseCategory = await axios.get('/api/categories', {
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
    <h1>Tambah Kucing</h1>

    <div class="container-form">
      <div class="alert-message-gagal" v-if="alert != ''">
        <p>{{ alert }}</p>
      </div>
      <div class="alert-message-sukses" v-if="alertSukses != ''">
        <p>{{ alertSukses }}</p>
      </div>

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

      <label for="weight">Weight (Kilogram)</label>
      <input type="text" placeholder="Weight" v-model="dataTambahKucing.weight" />

      <label for="description">Description</label>
      <textarea
        class="description"
        name=""
        id=""
        cols="50"
        rows="10"
        v-model="dataTambahKucing.description"
      ></textarea>

      <label for="">Upload Image</label>
      <input type="file" id="img" name="img" @change="handleFileChange" />

      <div class="button-container">
        <button type="button" @click="submit()" v-if="sendingFormLoading == false">
          Tambah Kucing
        </button>
        <button type="button" v-if="sendingFormLoading == true" disabled>
          <i class="fa-solid fa-spinner fa-xl"></i>
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
  max-width: 1200px;
  margin: 50px auto 0 auto;
  .container-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    input,
    select {
      padding: 5px;
    }
    .description {
      padding: 5px;
    }
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    button {
      width: 40%;
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
