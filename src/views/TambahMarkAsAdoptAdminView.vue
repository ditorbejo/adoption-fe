<script setup>
import { onMounted, reactive, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const axios = inject('axios')
const route = useRoute()
const router = useRouter()
const petId = route.params.id
const token = localStorage.getItem('token')
const name = ref()
const render = async () => {
  try {
    const responseKucing = await axios.get(`/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseKucing.status == 200) {
      name.value = responseKucing.data.data.name
      if (responseKucing.data.data.status_adopt == 'adopted') {
        router.push('/user/list-form-adopt')
      }
    }
  } catch (error) {
  }
}
const userId = ref({})
const renderUser = async () => {
  try {
    const responseUser = await axios.get(`/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseUser.status == 200) {
      userId.value = responseUser.data.id
    }
  } catch (error) {
  }
}
const checkAutoFillForm = ref(false)
const setAutoFill = (kondisi) => {
  checkAutoFillForm.value = kondisi
  if (checkAutoFillForm.value == false) {
    dataAdopter.name_adopter = ''
    dataAdopter.phone_adopter = ''
    dataAdopter.address_adopter = ''
    dataAdopter.email = ''
    dataAdopter.description = ''
  }
}

const dataHistoryAdopter = ref([])

const autoFillInput = async () => {
  try {
    const responseHistoryAdopt = await axios.get(`/api/adoptions/checkHistoryUserAdopt`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseHistoryAdopt.status == 200) {
      console.log(responseHistoryAdopt.data.data)
      dataHistoryAdopter.value = responseHistoryAdopt.data.data
    }
  } catch (error) {
  }
}

const handleSelectName = () => {
  const cariUser = dataHistoryAdopter.value.find(
    (user) => user.name_adopter === dataAdopter.name_adopter
  )
  console.log(cariUser)
  if (cariUser) {
    dataAdopter.name_adopter = cariUser.name_adopter
    dataAdopter.phone_adopter = cariUser.phone_adopter
    dataAdopter.address_adopter = cariUser.address_adopter
    dataAdopter.email = cariUser.email
  }
}

const dataAdopter = reactive({
  name_adopter: '',
  phone_adopter: '',
  address_adopter: '',
  email: '',
  pet_id: petId,
  description: '',
  user_id: userId
})
const formId = ref()
const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const markAsAdopt = async () => {
  sendingFormLoading.value = true
  try {
    const responseForm = await axios.post(`/api/adoptions/adopt`, dataAdopter, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseForm.status == 200) {
      console.log(responseForm.data.data)
      formId.value = responseForm.data.data.id
      alert.value = ''
      alertSukses.value = 'SUKSES MARK AS ADOPT'
      dataAdopter.name_adopter = ''
      dataAdopter.phone_adopter = ''
      dataAdopter.address_adopter = ''
      dataAdopter.email = ''
      dataAdopter.description = ''
      setTimeout(() => {
        router.push(`/admin/list-history-adopt`)
      }, 1000)
    }
    sendingFormLoading.value = false
  } catch (error) {
    if (error.response.status == 422) {
      if (
        dataAdopter.name_adopter == '' ||
        dataAdopter.phone_adopter == '' ||
        dataAdopter.address_adopter == '' ||
        dataAdopter.email == '' ||
        dataAdopter.description == ''
      ) {
        alert.value = 'ISI SEMUA FIELD FORM'
      }
    }
    sendingFormLoading.value = false
  }
}

onMounted(async () => {
  renderUser()
  render()
  await autoFillInput()
})
</script>
<template>
  <main>
    <h1>Form Adopt</h1>
    <div class="container-form">
      <div class="container-nama-kucing">
        <p>{{ name }}</p>
      </div>

      <div class="container-check-form" v-if="dataHistoryAdopter.length != 0">
        <p>Apakah anda melakukan adopsi sebelumnya ?</p>
        <div class="container-button-check">
          <button @click="setAutoFill(false)">Belum</button>
          <button @click="setAutoFill(true)">Sudah</button>
        </div>
      </div>

      <div class="alert-message-gagal" v-if="alert != ''">
        <p>{{ alert }}</p>
      </div>
      <div class="alert-message-sukses" v-if="alertSukses != ''">
        <p>{{ alertSukses }}</p>
      </div>

      <label for="">Nama Calon Adopter</label>
      <select
        v-model="dataAdopter.name_adopter"
        @change="handleSelectName()"
        v-if="checkAutoFillForm == true"
      >
        <option value="">Pilih Adopter Sebelumnya</option>
        <option v-for="option in dataHistoryAdopter" :value="option.name_adopter" :key="option.id">
          {{ option.name_adopter }} ({{ option.email }}) Adopt At {{ option.updated_at }}
        </option>
      </select>
      <input
        type="text"
        name=""
        id=""
        v-model="dataAdopter.name_adopter"
        v-if="checkAutoFillForm == false"
      />

      <label for="">Email Calon Adopter</label>
      <input type="email" name="" id="" v-model="dataAdopter.email" />

      <label for="">Alamat Calon Adopter</label>
      <input type="text" name="" id="" v-model="dataAdopter.address_adopter" />

      <label for="">Phone Calon Adopter</label>
      <input type="text" name="" id="" v-model="dataAdopter.phone_adopter" />

      <label for="">Mengapa ingin mengadopsi kucing tersebut</label>
      <textarea name="" id="" cols="50" rows="10" v-model="dataAdopter.description"></textarea>

      <div class="container-button">
        <button type="button" @click="markAsAdopt()" v-if="sendingFormLoading == false">
          <i class="fa-regular fa-paper-plane fa-xl"></i> Mark As Adopt
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
    gap: 5px;
    input {
      padding: 5px;
      border-radius: 5px;
    }
    select,
    option {
      padding: 10px;
    }
    .container-nama-kucing {
      background-color: #ffae11;
      padding: 5px;
      border-radius: 5px;
      margin: 15px 0px;
      p {
        display: flex;
        justify-content: center;
      }
    }
    .container-check-form {
      .container-button-check {
        display: flex;
        gap: 10px;
        button {
          padding: 5px;
          border-radius: 10px;
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
    .container-button {
      display: flex;
      justify-content: flex-end;
      button {
        width: 40%;
        padding: 10px;
        background-color: #ffd482;
        border-radius: 5px;
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
</style>
