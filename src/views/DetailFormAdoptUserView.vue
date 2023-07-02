<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

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
      <textarea name="" id="" cols="50" rows="10" v-model="dataForm.description"></textarea>
    </div>

    <div class="container-status">
      <label for="">Status Adopt</label>
      <p class="status-adopt" v-if="dataForm.status_adopt == 'ready'">{{ dataForm.status_adopt }}</p>
      <p class="status-adopt-adopted" v-else>{{ dataForm.status_adopt }}</p>

      <label for="">Status Form</label>
      <p class="status-form-review" v-if="dataForm.status == 'review'">{{ dataForm.status }}</p>
      <p class="status-form-approved"  v-else-if="dataForm.status == 'approved'">{{ dataForm.status }}</p>
      <p class="status-form-unavailable"  v-else>{{ dataForm.status }}</p>
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
  .container-nama-kucing{
    display: flex;
    p{
        display: flex;
        padding: 5px;
        border-radius: 5px;
        justify-content: center;
        width: 100%;
        background-color: #FFAE11;
    }
  }
  .container-detail{
    background-color: #FFD482;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    margin-top: 5%;
    border-radius: 10px;
    p{
        background-color: #D9D9D9;
        padding: 5px;
        border-radius: 5px;
        text-transform: capitalize;
    }
  }
  .container-status{
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    p{
        
        display: flex;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        text-transform: capitalize;
    }
    .status-adopt{
        background-color: #9BB05D;
    }
    .status-adopt-adopted{
        background-color: red;
    }
    .status-form-review{
        background-color: #AFB1B6;
    }
    .status-form-approved{
        background-color: #9BB05D;
    }

    .status-form-unavailable{
        background-color: red;
    }
  }
}
</style>
