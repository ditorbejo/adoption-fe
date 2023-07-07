<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const token = localStorage.getItem('token')
const route = useRoute()
const formId = route.params.id
const dataForm = ref({})
const render = async () => {
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
const router = useRouter()
const deleteForm = async () => {
  try {
    const responseDelete = await axios.delete(`http://127.0.0.1:8000/api/adoptions/${formId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {
      console.log(responseDelete)
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}

const acceptForm = async () => {
  try {
    const responseAccept = await axios.post(`http://127.0.0.1:8000/api/adoptions/${formId}/adopt`, {
        undefined
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseAccept.status == 200) {
      console.log(responseAccept)
      console.log('Berhasil melakukan adopsi')
      router.push('/admin/list-history-adopt')
      
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>Detail Form Adopt</h1>
    <div class="container-nama-kucing">
      <p>{{ dataForm.pet_name }}</p>
    </div>

    <div class="container-image-kucing">
      <img :src="`http://127.0.0.1:8000${dataForm.pet_image}`" alt="" />
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
      <textarea name="" id="" cols="50" rows="10" v-model="dataForm.description" disabled></textarea>
    </div>

    <div class="container-status">
      <label for="">Status Adopt</label>
      <p class="status-adopt" v-if="dataForm.status_adopt == 'ready'">
        {{ dataForm.status_adopt }}
      </p>
      <p class="status-adopt-adopted" v-else>{{ dataForm.status_adopt }}</p>

      <label for="">Status Form</label>
      <p class="status-form-review" v-if="dataForm.status == 'review'">{{ dataForm.status }}</p>
      <p class="status-form-approved" v-else-if="dataForm.status == 'approve'">
        {{ dataForm.status }}
      </p>
      <p class="status-form-unavailable" v-else>{{ dataForm.status }}</p>
    </div>

    <div class="container-button" v-if="dataForm.status_adopt == 'ready'">
      <p>Fitur Form</p>
      <button class="btn-chat" type="button">Chat</button>
      <button class="btn-accept" type="button" @click="acceptForm()">Setuju</button>
      <button class="btn-delete" type="button" @click="deleteForm()">Delete</button>
    </div>
    <div class="container-button" v-else>
      <p>Fitur Form</p>
      <button class="btn-chat" type="button">Chat</button>
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
  margin: 0 auto;
  max-width: 1920px;
  .container-nama-kucing {
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
  .container-status {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #f7de78;
    padding: 5px;
    border-radius: 5px;
    p {
      display: flex;
      justify-content: center;
      padding: 5px;
      border-radius: 5px;
      text-transform: capitalize;
    }
    .status-adopt {
      background-color: #9bb05d;
    }
    .status-adopt-adopted {
      background-color: red;
    }
    .status-form-review {
      background-color: #afb1b6;
    }
    .status-form-approved {
      background-color: #9bb05d;
    }

    .status-form-unavailable {
      background-color: red;
    }
  }
  .container-button {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5%;
    button {
      width: 100%;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      opacity: 80%;
    }
    .btn-chat {
      background-color: #f7de78;
    }
    .btn-accept {
      background-color: rgb(160, 255, 160);
    }
    .btn-delete {
      background-color: red;
    }
  }
}
</style>
