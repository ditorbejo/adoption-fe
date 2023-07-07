<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const petId = route.params.id
const token = localStorage.getItem('token')
const name = ref()
const render = async () => {
  try {
    const responseKucing = await axios.get(`http://127.0.0.1:8000/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseKucing.status == 200) {
      console.log(responseKucing)
      name.value = responseKucing.data.data.name
    }
  } catch (error) {
    console.log(error)
  }
}
const userId = ref({})
const renderUser = async () => {
  try {
    const responseUser = await axios.get(`http://127.0.0.1:8000/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseUser.status == 200) {
      console.log(responseUser.data.id)
      userId.value = responseUser.data.id
    }
  } catch (error) {
    console.log(error)
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

const sendForm = async () => {
  try {
    const responseSend = await axios.post(`http://127.0.0.1:8000/api/adoptions`, dataAdopter, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseSend.status == 200) {
      console.log(responseSend.data.data.id)
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Mendaftarkan Form Adopsi</p>`
      dataAdopter.name_adopter = ''
      dataAdopter.phone_adopter = ''
      dataAdopter.address_adopter = ''
      dataAdopter.email = ''
      dataAdopter.description = ''
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  renderUser()
  render()
})
</script>
<template>
  <main>
    <h1>Form Adopt</h1>
    <div class="container-form">
      <div class="container-nama-kucing">
        <p>{{ name }}</p>
      </div>
      <div class="alert-message"></div>

      <label for="">Nama Calon Adopter</label>
      <input type="text" name="" id="" v-model="dataAdopter.name_adopter" />

      <label for="">Email Calon Adopter</label>
      <input type="email" name="" id="" v-model="dataAdopter.email" />

      <label for="">Alamat Calon Adopter</label>
      <input type="text" name="" id="" v-model="dataAdopter.address_adopter" />

      <label for="">Phone Calon Adopter</label>
      <input type="text" name="" id="" v-model="dataAdopter.phone_adopter" />

      <label for="">Mengapa ingin mengadopsi kucing tersebut</label>
      <textarea name="" id="" cols="50" rows="10" v-model="dataAdopter.description"></textarea>

      <div class="container-button">
        <button type="button" @click="sendForm()">Kirim Form</button>
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
    gap: 5px;
    input {
      padding: 5px;
      border-radius: 5px;
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
    .container-button {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      button {
        padding: 5px;
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
