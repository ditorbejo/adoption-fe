<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const route = useRoute()
const formId = route.params.id
const dataForm = ref({})
const imageUrl = import.meta.env.VITE_BACKEND_URL
const render = async () => {
  try {
    const responseDetail = await axios.get(`/api/adoptions/${formId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDetail.status == 200) {
      dataForm.value = responseDetail.data.data
    }
  } catch (error) {}
}

const acceptForm = async () => {
  try {
    const responseAccept = await axios.post(
      `/api/adoptions/${formId}/adopt`,
      {
        undefined
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseAccept.status == 200) {
      router.push('/admin/list-history-adopt')
    }
  } catch (error) {}
}

const router = useRouter()
const goToRejectForm = (routePath) => {
  router.push(routePath)
}
const goToDetailKucing = (routePath) => {
  router.push(routePath)
}
const goToChatUser = () => {
  router.push(`/admin/chat/${dataForm.value.user_id}?formId=${formId}`)
}
const cancelAdoption = async () => {
  try {
    const responseDelete = await axios.delete(`/api/adoptions/${formId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDelete.status == 200) {
      router.push('/admin/list-kucing')
    }
  } catch (error) {}
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

    <div class="container-image">
      <div class="container-image-kucing">
        <img :src="`${imageUrl}${dataForm.pet_image}`" alt="" />
      </div>
    </div>

    <div class="container-button-detail-kucing">
      <button
        class="button-detail-kucing"
        @click="goToDetailKucing(`/admin/pets/${dataForm.pet_id}`)"
      >
        <i class="fa-solid fa-circle-info fa-xl"></i>
        Detail Informasi Kucing
      </button>
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
        class="description"
        cols="50"
        rows="10"
        v-model="dataForm.description"
        disabled
      ></textarea>
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

    <div
      class="container-button"
      v-if="dataForm.status_adopt == 'ready' && dataForm.status == 'review'"
    >
      <p>Fitur Form</p>
      <button
        class="btn-chat"
        type="button"
        @click="goToChatUser(`/admin/chat/${dataForm.user_id}`)"
      >
        <i class="fa-solid fa-message fa-2xl" style="color: #000000"></i>
        Chat
      </button>
      <button class="btn-accept" type="button" @click="acceptForm()">
        <i class="fa-solid fa-circle-check fa-2xl"></i>
        Setuju
      </button>
      <button
        class="btn-delete"
        type="button"
        @click="goToRejectForm(`/admin/form-reject/${formId}`)"
      >
        <i class="fa-solid fa-xmark fa-2xl"></i>
        Reject
      </button>
    </div>

    <div class="container-button" v-else>
      <p>Fitur Form</p>
      <button class="btn-chat" type="button" @click="goToChatUser()">
        <i class="fa-solid fa-message fa-xl" style="color: #000000"></i>
        Chat
      </button>
      <button class="btn-cancel-adopt" type="button" @click="cancelAdoption()">
        Cancel Adoption
      </button>
    </div>

    <div class="alasan-reject" v-if="dataForm.status == 'reject'">
      <label for="">Alasan Form Ditolak</label>
      <textarea name="" id="" cols="50" rows="10" v-model="dataForm.reject" disabled></textarea>
    </div>
  </main>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
}
main {
  background-color: white;
  color: black;
  width: 100%;
  padding: 10px 20px;
  margin: 50px auto 0 auto;
  max-width: 1200px;
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
  .container-image {
    display: flex;
    justify-content: center;
    .container-image-kucing {
      display: flex;
      background-color: #ffae11;
      padding: 10px;
      margin-top: 5%;
      border-radius: 10px;
      img {
        object-fit: fill;
        width: 300px;
        height: 300px;
        border-radius: 10px;
      }
    }
  }

  .container-button-detail-kucing {
    margin-top: 5%;
    display: flex;
    button {
      padding: 10px;
      width: 100%;
      border-radius: 10px;
      background-color: #f29727;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      cursor: pointer;
    }
    button:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
    .description {
      padding: 10px;
      width: 100%;
      overflow: hidden;
      resize: none;
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
      background-color: rgb(255, 253, 188);
    }
    .status-form-review {
      background-color: #afb1b6;
    }
    .status-form-approved {
      background-color: #9bb05d;
    }

    .status-form-unavailable {
      background-color: #dbff58;
    }
  }

  .alasan-reject {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    background-color: #d9d9d9;
    padding: 10px;
    border-radius: 10px;
    textarea {
      resize: none;
      padding: 10px;
    }
  }
  .container-button {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5%;
    button {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      opacity: 80%;
    }
    .btn-chat {
      border: 2px solid #ffffff;
      background-color: #f7de78;
    }
    .btn-accept {
      border: 2px solid #ffffff;
      background-color: rgb(160, 255, 160);
    }
    .btn-delete {
      border: 2px solid #ffffff;
      background-color: red;
    }
    .btn-cancel-adopt {
      border: 2px solid #ffffff;
      background-color: red;
      color: white;
      font-weight: bolder;
    }
  }
}
</style>
