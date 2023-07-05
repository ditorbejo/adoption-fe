<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const route = useRoute()
const router = useRouter()
const petId = route.params.id
const pets = ref({})

const render = async () => {
  try {
    const responsePets = await axios.get(`http://127.0.0.1:8000/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responsePets.status == 200) {
      console.log(responsePets.data.data)
      pets.value = responsePets.data.data
    }
    fetchAlbum()
  } catch (error) {
    console.log(error)
  }
}

const goToDelete = async () => {
  try {
    const responseDelete = await axios.delete(`http://127.0.0.1:8000/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {
      console.log(responseDelete)
      router.push('/admin/home')
    }
  } catch (error) {
    console.log(error)
  }
}

const inputFiles = reactive([])
let counter = 0
const tambahUpload = () => {
  console.log(inputFiles)
  const file = ref(null)
  inputFiles.push({
    file: file,
    handler: (event) => {
      file.value = event.target.files[0]
    },
    id: counter++
  })
}

const removeFile = (id) => {
  const targetIndex = inputFiles.findIndex((inputFile) => {
    inputFile.id == id
  })
  inputFiles.splice(targetIndex, 1)
}

const images = ref()
const fetchAlbum = async () => {
  try {
    const responseAlbum = await axios.get(`http://127.0.0.1:8000/api/galleries?pet_id=${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseAlbum.status == 200) {
      console.log(responseAlbum.data.data)
      images.value = responseAlbum.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const simpanAlbum = async () => {
  const someFileIsNull = inputFiles.some((inputFile) => {
    return inputFile.file == null
  })
  if (someFileIsNull) {
    console.log('ada file input yang kosong')
    return
  }
  const imageUploadPromises = inputFiles.map((inputFile) => {
    const formData = new FormData()
    formData.append('pet_id', petId)
    formData.append('image', inputFile.file)
    return axios.post(`http://127.0.0.1:8000/api/galleries`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  })
  const imageUploadResponses = await Promise.all(imageUploadPromises)
  imageUploadResponses.forEach((response) => {
    if (response.status == 200) {
      console.log('berhasil menyimpan gambar')
    }
    inputFiles.shift()
  })
  fetchAlbum()
}
const hapusGambar = async (imageId) => {
  try {
    const responseDelete = await axios.delete(`http://127.0.0.1:8000/api/galleries/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {
      console.log(responseDelete)
    }
  } catch (error) {
    console.log(error)
  }
  fetchAlbum()
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
    <h1>Detail Kucing</h1>
    <div class="container-detail">
      <img class="gambar-utama" :src="`http://127.0.0.1:8000${pets.image}`" alt="" />

      <label for="">Album Photo</label>
      <div class="container-album">
        <button type="button" @click="tambahUpload()">Tambah Gambar</button>

        <div class="container-tambah-gambar" v-for="inputFile in inputFiles" :key="inputFile.id">
          <input type="file" @change="inputFile.handler" />
          <button type="button" @click="removeFile(inputFile.id)">Remove</button>
        </div>

        <button type="button" @click="simpanAlbum()">Simpan Album</button>

        <div class="container-gambar">
          <div class="container-loop-gambar" v-for="image in images" :key="image.id">
            <img class="gambar-album" :src="`http://127.0.0.1:8000${image.image}`" alt="" />
            <button type="button" @click="hapusGambar(image.id)">Hapus</button>
          </div>
        </div>
      </div>

      <label for="">Nama</label>
      <p>{{ pets.name }}</p>

      <label for="">Gender</label>
      <p class="gender">{{ pets.gender }}</p>

      <label for="">Certificate</label>
      <p>{{ pets.certificate }}</p>

      <label for="">Color</label>
      <p>{{ pets.color }}</p>

      <label for="">Categories</label>
      <p>{{ pets.categories_id }}</p>

      <label for="">Date Birth</label>
      <p>{{ pets.date_birth }}</p>

      <label for="">Weight</label>
      <p>{{ pets.weight }}</p>

      <label for="">Description</label>
      <textarea
        disabled
        class="description"
        id=""
        cols="50"
        rows="10"
        v-model="pets.description"
      ></textarea>

      <label for="">Status Adopt</label>
      <p class="status_adopt">{{ pets.status_adopt }}</p>
    </div>

    <div class="container-button" v-if="pets.status_adopt == 'ready'">
      <button class="btn-adopt" type="button" @click="goToEdit(`/admin/pets/adopt/${petId}`)">
        Mark As Adopt
      </button>

      <button class="btn-edit-kucing" type="button" @click="goToEdit(`/admin/pets/edit/${petI}`)">
        Edit Kucing
      </button>

      <button class="btn-delete-kucing" type="button" @click="goToDelete()">Delete Kucing</button>
    </div>

    <div class="container-button" v-else>

      <button class="btn-delete-kucing" type="button" @click="goToDelete()">Delete Kucing</button>
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
  .container-detail {
    display: flex;
    flex-direction: column;
    background-color: #ffd482;
    padding: 10px;
    border-radius: 10px;
    gap: 5px;
    p {
      background-color: azure;
      padding: 5px;
      border-radius: 5px;
    }
    .gambar-utama {
      width: 100%;
      max-height: 300px;
      object-fit: fill;
    }
    .gender {
      text-transform: capitalize;
    }
    .description {
      overflow: hidden;
    }
    .status_adopt {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #85a675;
      text-transform: capitalize;
    }
    .container-album {
      display: flex;
      flex-direction: column;
      gap: 5px;
      button {
        display: flex;
        width: 40%;
        background-color: #85a675;
        padding: 2px;
        border-radius: 5px;
      }
      .container-tambah-gambar {
        background-color: burlywood;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 5px;
      }
      .container-gambar {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: minmax(1, 3);
        grid-column-gap: 20px;
        grid-row-gap: 20px;

        .container-loop-gambar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 5px;
          background-color: azure;
          img {
            width: 100%;
            height: 100px;
            object-fit: fill;
          }
          button {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
  .container-button {
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    gap: 5px;
    button {
      padding: 5px;
      border-radius: 10px;
    }
    button:hover {
      opacity: 80%;
    }
    .btn-edit-kucing {
      background-color: #85a675;
    }
    .btn-delete-kucing {
      background-color: #ff3c3c;
    }
  }
}
</style>
