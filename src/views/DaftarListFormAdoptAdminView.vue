<script setup>
import { onMounted, reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const forms = ref({})
const render = async () => {
  try {
    const responseListAdopt = await axios.get(`/api/adoptions?status=review`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseListAdopt.status == 200) {
      forms.value = responseListAdopt.data.data
    
    }
  } catch (error) {
 
  }
}

const router = useRouter()
function goToDetail(routePath) {
  router.push(routePath)
}

const formStatusName = ref()
const getListForm = async (statusFormName) => {
  formStatusName.value = statusFormName
  try {
    const responseForm = await axios.get(`/api/adoptions?status=${statusFormName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseForm.status == 200) {
    
      forms.value = responseForm.data.data
    }
  } catch (error) {
   
  }
}

const getListFormNameAdopter = async (statusFormName) => {
  formStatusName.value = statusFormName
  try {
    const responseForm = await axios.get(
      `/api/adoptions?name_adopter=${listForm.name_adopter}&status=${statusFormName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseForm.status == 200) {
   
      forms.value = responseForm.data.data
    }
  } catch (error) {
  
  }
}

const listForm = reactive({
  name_adopter: ''
})

const searchFormAdopt = async (namaAdopter) => {
  try {
    if (formStatusName.value != null) {
      const responseListForm = await axios.get(
        `/api/adoptions?name_adopter=${namaAdopter}&status=${formStatusName.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (responseListForm.status == 200) {
      
        forms.value = responseListForm.data.data
      }
    } else {
      const responseListForm = await axios.get(`/api/adoptions?name_adopter=${namaAdopter}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (responseListForm.status == 200) {
   
        forms.value = responseListForm.data.data
      }
    }
  } catch (error) {
  
  }
}

const removeFilterName = () => {
  listForm.name_adopter = ''
  formStatusName.value = null
  render()
}
onMounted(() => {
  render()
})
</script>
<template>
  <main>
    <h1>List Adopt Kucing</h1>

    <div class="container-filter" v-if="listForm.name_adopter == ''">
      <p class="judul-status-form">Status Form Filter</p>
      <p class="filter-status-name" v-if="formStatusName != null">{{ formStatusName }}</p>
      <div class="box-filter">
        <button class="button-review" @click="getListForm('review')">Review</button>
        <button class="button-approve" @click="getListForm('approve')">Approve</button>
        <button class="button-reject" @click="getListForm('reject')">Reject</button>
        <button class="button-unavailable" @click="getListForm('unavailable')">Unavailable</button>
      </div>
    </div>

    <div class="container-filter" v-if="listForm.name_adopter">
      <p class="judul-status-form">Filter With Name</p>
      <p class="filter-status-name" v-if="formStatusName != null">{{ formStatusName }}</p>
      <div class="box-filter">
        <button class="button-review" @click="getListFormNameAdopter('review')">Review</button>
        <button class="button-approve" @click="getListFormNameAdopter('approve')">Approve</button>
        <button class="button-reject" @click="getListFormNameAdopter('reject')">Reject</button>
        <button class="button-unavailable" @click="getListFormNameAdopter('unavailable')">
          Unavailable
        </button>
      </div>
    </div>

    <div class="container-search-form">
      <label for="">Search by Nama</label>
      <div class="input-name-filter">
        <input
          type="text"
          v-model="listForm.name_adopter"
          @input="searchFormAdopt(listForm.name_adopter)"
        />
        <button @click="removeFilterName()"><i class="fa-solid fa-xmark fa-2xl"></i></button>
      </div>
    </div>

    <div class="list-form-kosong" v-if="forms.length == 0">
      <p>BELUM ADA FORM ADOPSI</p>
    </div>

    <div class="container-list" v-else>
      <div class="container-detail" v-for="form in forms" :key="form.id">
        <label>Nama Calon Adopter</label>
        <p>{{ form.name_adopter }}</p>

        <label>Email Calon Adopter</label>
        <p>{{ form.email }}</p>

        <label>Nama Kucing</label>
        <p>{{ form.pet_name }}</p>

        <label>Status Adopt</label>
        <p class="status-adopt-adopted" v-if="form.status_adopt == 'adopted'">
          {{ form.status_adopt }}
        </p>
        <p class="status-adopt" v-else>{{ form.status_adopt }}</p>

        <label for="">Status Form</label>
        <p class="status-form-review" v-if="form.status == 'review'">{{ form.status }}</p>
        <p class="status-form-approve" v-else-if="form.status == 'approve'">{{ form.status }}</p>
        <p class="status-form-reject" v-else-if="form.status == 'reject'">{{ form.status }}</p>
        <p class="status-form-unavailable" v-else-if="form.status == 'unavailable'">
          {{ form.status }}
        </p>

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
  .container-filter {
    display: flex;
    flex-direction: column;
    .filter-status-name {
      display: flex;
      padding: 10px;
      justify-content: center;
      text-transform: capitalize;
      border-radius: 10px;
      border: 2px solid #ffd482;
    }
    .box-filter {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      button {
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bolder;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      }
      button:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      .button-review {
        background-color: #d9d9d9;
      }
      .button-approve {
        background-color: #85eb60;
      }
      .button-reject {
        background-color: red;
      }
      .button-unavailable {
        background-color: #ffd482;
      }
    }
  }
  .container-search-form {
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    label {
      display: flex;
      align-items: center;
    }
    .input-name-filter {
      display: flex;
      flex-direction: row;
      gap: 5px;
      input {
        border-radius: 10px;
        padding: 5px;
      }
      button {
        padding: 5px;
      }
    }
  }
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
      .status-form-review {
        background-color: #d9d9d9;
        display: flex;
        justify-content: center;
        text-transform: capitalize;
      }
      .status-form-approve {
        background-color: #79d53f;
        display: flex;
        justify-content: center;
        text-transform: capitalize;
      }
      .status-form-reject {
        background-color: #ff2020;
        display: flex;
        justify-content: center;
        text-transform: capitalize;
      }
      .status-form-unavailable {
        background-color: #dbff58;
        display: flex;
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
}

@media only screen and (min-width: 768px) {
  main {
    .container-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
    }
  }
}

@media only screen and (min-width: 1024px) {
  main {
    .container-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
    }
  }
}
</style>
