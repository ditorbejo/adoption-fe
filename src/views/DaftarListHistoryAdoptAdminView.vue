<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const forms = ref({})
const render = async () => {
  try {
    const responseListAdopt = await axios.get(`/api/adoptions?status=approve`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const responseHistoryAdopt = await axios.get(`/api/pets?status_adopt=adopted`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseListAdopt.status == 200) {
      forms.value = responseListAdopt.data.data
    }
    if (responseHistoryAdopt.status == 200) {
      console.log(responseHistoryAdopt.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
function goToDetail(routePath) {
  router.push(routePath)
}

onMounted(() => {
  render()
})
</script>
<template>
  <main>
    <h1>History Adopt Kucing</h1>

    <div class="list-form-kosong" v-if="forms.length == 0">
      <p>BELUM ADA ADOPSI KUCING</p>
    </div>

    <div class="container-list">
      <div class="container-detail" v-for="form in forms" :key="form.id">
        <label>Nama Adopter</label>
        <p>{{ form.name_adopter }}</p>

        <label>Email Adopter</label>
        <p>{{ form.email }}</p>

        <label>Nama Kucing</label>
        <p>{{ form.pet_name }}</p>

        <label>Status Adopt</label>
        <p class="status-adopt-adopted" v-if="form.status_adopt == 'adopted'">
          {{ form.status_adopt }}
        </p>
        <p class="status-adopt" v-else>{{ form.status_adopt }}</p>
        <div class="container-button">
          <button type="button" @click="goToDetail(`/admin/adoptions/${form.id}`)">Detail</button>
        </div>
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
  margin: 50px auto 0 auto;
  max-width: 1200px;
  .list-form-kosong {
    margin-top: 5%;
    background-color: #ffd482;
    padding: 10px;
    border-radius: 10px;
    p {
      display: flex;
      text-transform: capitalize;
      align-items: center;
      justify-content: center;
    }
  }
  .container-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .container-detail {
    background-color: #ffd482;
    padding: 5px;
    border-radius: 10px;
    p {
      padding: 5px;
      background-color: #f3f3f3;
      border-radius: 10px;
    }
    .status-adopt {
      display: flex;
      background-color: #9bb05d;
      justify-content: center;
      text-transform: capitalize;
    }
    .status-adopt-adopted {
      display: flex;
      background-color: rgb(255, 253, 188);
      justify-content: center;
      text-transform: capitalize;
    }
    .container-button {
      display: flex;
      justify-content: center;
      margin-top: 5%;
      button {
        width: 100%;
        padding: 5px;
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
