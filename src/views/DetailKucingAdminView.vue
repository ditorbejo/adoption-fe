<script setup>
import { onMounted, reactive, ref ,inject} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const route = useRoute()
const router = useRouter()
const petId = route.params.id
const pets = ref({})
const imageUrl = import.meta.env.VITE_BACKEND_URL

const render = async () => {
  try {
    const responsePets = await axios.get(`/api/pets/${petId}`, {
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
    const responseDelete = await axios.delete(`/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {
      console.log(responseDelete)
      router.push('/admin/list-kucing')
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
    const responseAlbum = await axios.get(`/api/galleries?pet_id=${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseAlbum.status == 200) {
      images.value = responseAlbum.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const listFormAdoptions = ref({})
const renderFormAdopt = async () => {
  try {
    const renderFormAdopt = await axios.get(`/api/pets/${petId}/adoptions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (renderFormAdopt.status == 200) {
      console.log(renderFormAdopt.data.data)
      listFormAdoptions.value = renderFormAdopt.data.data
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
    return axios.post(`/api/galleries`, formData, {
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
    const responseDelete = await axios.delete(`/galleries/${imageId}`, {
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
const goToDetailForm = (routePath) => {
  router.push(routePath)
}
const goToListAllFormAdoptions = (routePath) => {
  router.push(routePath)
}

onMounted(() => {
  render()
  renderFormAdopt()
})
</script>

<template>
  <main>
    <h1>Detail Kucing</h1>
    <div class="container-detail">
      <div class="container-image">
        <img class="gambar-utama" :src="`http://127.0.0.1:8000${pets.image}`" alt="" />
      </div>

      <label for="">Album Photo</label>
      <div class="container-album" v-if="pets.status_adopt == 'ready'">
        <button class="btn-tambah-gambar" type="button" @click="tambahUpload()">
          Tambah Gambar
        </button>

        <div class="container-tambah-gambar" v-for="inputFile in inputFiles" :key="inputFile.id">
          <input type="file" @change="inputFile.handler" />
          <button type="button" @click="removeFile(inputFile.id)">Remove</button>
        </div>

        <button class="btn-simpan-album" type="button" @click="simpanAlbum()">Simpan Album</button>

        <div class="container-gambar">
          <div class="container-loop-gambar" v-for="image in images" :key="image.id">
            <img class="gambar-album" :src="`${imageUrl}${image.image}`" alt="" />
            <button type="button" @click="hapusGambar(image.id)">Hapus</button>
          </div>
        </div>
      </div>

      <div class="container-album" v-else>
        <div class="container-gambar">
          <div class="container-loop-gambar" v-for="image in images" :key="image.id">
            <img class="gambar-album" :src="`${imageUrl}${image.image}`" alt="" />
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
      <p>{{ pets.categories_name }}</p>

      <label for="">Date Birth</label>
      <p>{{ pets.format_date_birth }}</p>

      <label for="">Weight</label>
      <p>{{ pets.weight }} Kg</p>

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
      <p class="status_adopt" v-if="pets.status_adopt == 'ready'">{{ pets.status_adopt }}</p>
      <p class="status_adopt-adopted" v-else>{{ pets.status_adopt }}</p>
    </div>

    <div class="container-adoptions" v-if="listFormAdoptions.length != 0">
      <p>List Form Adoptions</p>

      <div class="container-button-list-all">
        <button @click="goToListAllFormAdoptions(`/admin/pets/${petId}/adoptions`)">
          List All Form Adoptions
        </button>
      </div>

      <div class="container-list-form">
        <div class="detail-form-adoptions" v-for="adoption in listFormAdoptions" :key="adoption.id">
          <label>Name Adopter</label>
          <p>
            {{ adoption.name_adopter }}
          </p>
          <label>Phone Adopter</label>
          <p>
            {{ adoption.phone_adopter }}
          </p>
          <label>Email Adopter</label>
          <p>
            {{ adoption.email }}
          </p>
          <label>Status Form</label>
          <p class="adoption-status">
            {{ adoption.status }}
          </p>
          <button @click="goToDetailForm(`/admin/adoptions/${adoption.id}`)">Detail Form</button>
        </div>
      </div>
    </div>

    <div class="container-button" v-if="pets.status_adopt == 'ready'">
      <button class="btn-adopt" type="button" @click="goToEdit(`/admin/pets/adopt/${petId}`)">
        Mark As Adopt
      </button>

      <button class="btn-edit-kucing" type="button" @click="goToEdit(`/admin/pets/edit/${petId}`)">
        Edit Kucing
      </button>

      <button class="btn-delete-kucing" type="button" @click="goToDelete()">Delete Kucing</button>
    </div>

    <div class="container-button" v-else></div>
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
    background-color: #ffd482;
    padding: 10px;
    border-radius: 10px;
    gap: 5px;
    max-width: 1920px;
    margin: 0 auto;
    p {
      background-color: azure;
      padding: 5px;
      border-radius: 5px;
    }
    .container-image {
      display: flex;
      justify-content: center;
      .gambar-utama {
        padding: 10px;
        background-color: #f79327;
        width: 300px;
        max-height: 300px;
        object-fit: fill;
      }
    }

    .gender {
      text-transform: capitalize;
    }
    .description {
      overflow: hidden;
      padding: 10px;
      resize: none;
    }
    .status_adopt {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #85a675;
      text-transform: capitalize;
    }
    .status_adopt-adopted {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      text-transform: capitalize;
    }
    .container-album {
      display: flex;
      flex-direction: column;
      gap: 5px;
      button {
        display: flex;
        justify-content: center;
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
        grid-template-rows: repeat(auto, 1fr);
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
            height: 150px;
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
  .container-adoptions {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .container-button-list-all {
      button {
        padding: 10px;
        border-radius: 10px;
        width: 100%;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      }
      button:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
    }
    .container-list-form {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      .detail-form-adoptions {
        display: flex;
        flex-direction: column;
        padding: 5px;
        border-radius: 10px;
        background-color: #ffd482;
        p {
          text-transform: capitalize;
          padding: 5px;
          border-radius: 10px;
          background-color: #f7f3f3;
        }
        .adoption-status {
          text-align: center;
          background-color: #d9d9d9;
        }
        button {
          margin-top: 10px;
          border-radius: 10px;
          padding: 5px;
          cursor: pointer;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }
        button:hover {
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
    }
  }
  .container-button {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 1920px;
    margin: 100px auto;
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
@media only screen and (min-width: 768px) {
  main {
    .container-detail {
      .gambar-utama {
        padding: 10px;
        background-color: #f79327;
        border-radius: 10px;
        margin: 0 auto;
        width: 100%;
        max-width: 400px;
        height: 400px;
      }
      .container-album {
        .container-gambar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(auto, 1fr);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }
      }
    }
    .container-adoptions {
      .container-list-form {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(auto, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
      }
    }
  }
}
@media only screen and (min-width: 1024px) {
  main {
    .container-detail {
      .gambar-utama {
        padding: 10px;
        background-color: #f79327;
        border-radius: 10px;
        margin: 0 auto;
        width: 100%;
        max-width: 400px;
        height: 400px;
      }
      .container-album {
        .container-gambar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(auto, 1fr);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
        }
      }
    }
    .container-adoptions {
      .container-list-form {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(auto, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
      }
    }
  }
}
</style>
