<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router'

const token = localStorage.getItem('token')
const route = useRoute()
const formId = route.params.id
const dataForm = ref({})
const dataFormReject = reactive({
  reject: ''
})
const renderForm = async () => {
  try {
    const responseDetail = await axios.get(`http://127.0.0.1:8000/api/adoptions/${formId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDetail.status == 200) {
      console.log(responseDetail.data.data)
      dataForm.value = responseDetail.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const submitFormReject = async () => {
  try {
    const responseReject = await axios.post(
      `http://127.0.0.1:8000/api/adoptions/${formId}/reject`,
      dataFormReject,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseReject.status == 200) {
      console.log(responseReject)
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Mendaftarkan Form Adopsi</p>`
      setTimeout(() => {
        router.push(`/admin/adoptions/${formId}`)
      })
    }
  } catch (error) {
    console.log(error)
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = `<p style="color:red;">Isi field alasan menolak form</p>`
  }
}

onMounted(() => {
  renderForm()
})
</script>

<template>
  <main>
    <h1>Reject Form Adopsi</h1>

    <div class="container-nama-kucing">
      <p>{{ dataForm.pet_name }}</p>
    </div>

    <div class="container-detail">
      <label for="">Nama Calon Adopter</label>
      <p>{{ dataForm.name_adopter }}</p>

      <label for="">Email Calon Adopter</label>
      <p>{{ dataForm.email }}</p>

      <label for="">Alamat Calon Adopter</label>
      <p>{{ dataForm.address_adopter }}</p>

      <label for="">Phone Calon Adopter</label>
      <p>{{ dataForm.phone_adopter }}</p>

      <label for="">Mengapa ingin mengadopsi kucing tersebut</label>
      <textarea
        name=""
        id=""
        cols="50"
        rows="10"
        v-model="dataForm.description"
        disabled
      ></textarea>
    </div>

    <div class="alert-message"></div>

    <div class="container-alasan">
      <label for="">Alasan Form Ini Ditolak</label>
      <textarea
        name=""
        id=""
        cols="50"
        rows="10"
        v-model="dataFormReject.reject"
        required
      ></textarea>
      <button @click="submitFormReject()">Kirim Form</button>
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

  .container-nama-kucing {
    margin-top: 5%;
    display: flex;
    p {
      display: flex;
      padding: 5px;
      border-radius: 5px;
      justify-content: center;
      width: 100%;
      background-color: #ffae11;
    }
  }
  .container-image-kucing {
    display: flex;
    background-color: #ffae11;
    padding: 10px;
    margin-top: 5%;
    border-radius: 10px;
    img {
      object-fit: fill;
      width: 100%;
      height: 300px;
      border-radius: 10px;
    }
  }
  .container-detail {
    background-color: #ffd482;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    margin-top: 5%;
    border-radius: 10px;
    p {
      background-color: #d9d9d9;
      padding: 5px;
      border-radius: 5px;
      text-transform: capitalize;
    }
  }
  .container-alasan {
    margin-top: 5%;
    background-color: #ffd482;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    button {
      padding: 5px;
    }
    textarea {
      padding: 10px;
      resize: none;
      overflow: hidden;
    }
  }
}
</style>
