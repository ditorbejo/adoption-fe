<script setup>
import { onMounted, reactive, ref ,inject} from 'vue'
import { useRoute } from 'vue-router'
import router from '../router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const route = useRoute()
const itemId = route.params.id
const name = ref({})
const gender = ref({})
const certificate = ref({})
const color = ref({})
const status_adopt = ref({})
const category = ref()
const date_birth = ref({})
const weight = ref({})
const description = ref({})
const image = ref({})
const imageUrl = import.meta.env.VITE_BACKEND_URL

const dataKucing = reactive({
  name: name,
  gender: gender,
  status_adopt: status_adopt,
  certificate: certificate,
  color: color,
  categories_id: category,
  date_birth: date_birth,
  weight: weight,
  description: description
})
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

let file = null
function handleFileChange() {
  file = event.target.files[0]
}

const render = async () => {
  try {
    const responseKucing = await axios.get(`/api/pets/${itemId}}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseKucing.status == 200) {
      console.log(responseKucing.data.data)
      name.value = responseKucing.data.data.name
      gender.value = responseKucing.data.data.gender
      status_adopt.value = responseKucing.data.data.status_adopt
      certificate.value = responseKucing.data.data.certificate
      color.value = responseKucing.data.data.color
      category.value = responseKucing.data.data.categories_id
      date_birth.value = responseKucing.data.data.date_birth
      weight.value = responseKucing.data.data.weight
      description.value = responseKucing.data.data.description
      image.value = responseKucing.data.data.image
    }
    if (status_adopt.value == 'adopted') {
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}
const options = ref([])

const simpanEdit = async () => {
  const formData = new FormData()
  if (file == null) {
    formData.append('name', dataKucing.name)
    formData.append('description', dataKucing.description)
    formData.append('status_adopt', dataKucing.status_adopt)
    formData.append('color', dataKucing.color)
    formData.append('weight', dataKucing.weight)
    formData.append('date_birth', dataKucing.date_birth)
    formData.append('categories_id', dataKucing.categories_id)
    formData.append('certificate', dataKucing.certificate)
    formData.append('gender', dataKucing.gender)
  } else {
    formData.append('image', file)
    formData.append('name', dataKucing.name)
    formData.append('description', dataKucing.description)
    formData.append('status_adopt', dataKucing.status_adopt)
    formData.append('color', dataKucing.color)
    formData.append('weight', dataKucing.weight)
    formData.append('date_birth', dataKucing.date_birth)
    formData.append('categories_id', dataKucing.categories_id)
    formData.append('certificate', dataKucing.certificate)
    formData.append('gender', dataKucing.gender)
  }

  try {
    const responseSimpan = await axios.post(`/api/pets/${itemId}}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseSimpan.status == 200) {
      console.log(responseSimpan)
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Berhasil melakukan update data</p>`
      console.log(file)
      dataKucing.name = ''
      dataKucing.description = ''
      dataKucing.color = ''
      dataKucing.weight = ''
      dataKucing.date_birth = ''
      dataKucing.certificate = ''
      router.push(`/admin/pets/${itemId}`)
    }
  } catch (error) {
    console.log(error)
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = `<p style="color:red;">Field tidak boleh ada yang kosong selain image</p>`
  }
}
onMounted(() => {
  getDataCategory()
  render()
})
</script>
<template>
  <main>
    <h1>Edit Kucing</h1>

    <div class="container-edit">
      <div class="container-image">
        <img :src="`${imageUrl}${image}`" alt="" />
      </div>

      <div class="alert-message"></div>

      <div class="container-input">
        <label for="">Nama</label>
        <input type="text" v-model="dataKucing.name" />

        <label for="">Gender</label>
        <select id="gender" name="gender" v-model="dataKucing.gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label for="">Status Adopt</label>
        <select id="status_adopt" name="status_adopt" v-model="dataKucing.status_adopt">
          <option value="ready">Ready</option>
          <option value="adopted">Adopted</option>
        </select>

        <label for="">Certificate</label>
        <input type="text" v-model="dataKucing.certificate" />

        <label for="">Color</label>
        <input type="text" v-model="dataKucing.color" />

        <label for="category">Category</label>
        <select name="category" v-model="dataKucing.categories_id">
          <option v-for="option in options" :value="option.id" :key="option.id">
            {{ option.namecategory }}
          </option>
        </select>

        <label for="">Date Birth</label>
        <input type="date" v-model="dataKucing.date_birth" />

        <label for="">Weight</label>
        <input type="text" v-model="dataKucing.weight" />

        <label for="">Description</label>
        <textarea name="" id="" cols="50" rows="10" v-model="dataKucing.description"></textarea>

        <input type="file" id="img" name="img" @change="handleFileChange" />
      </div>

      <div class="container-button">
        <button class="button" @click="simpanEdit()">Simpan</button>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
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
    margin-top: 5%;
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

    .container-input {
      display: flex;
      flex-direction: column;
      input {
        padding: 5px;
        border-radius: 5px;
      }
    }
    .container-button {
      margin-top: 5%;
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
