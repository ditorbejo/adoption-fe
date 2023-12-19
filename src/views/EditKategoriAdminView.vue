<script setup>
import { onMounted, reactive, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const axios = inject('axios')
const token = localStorage.getItem('token')
const route = useRoute()
const router = useRouter()
const itemId = route.params.id
const nama = ref()
const rename = ref()

const dataEdit = reactive({
  namecategory: rename
})
const render = async () => {
  try {
    const responseEdit = await axios.get(`/api/categories/${itemId}}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseEdit.status == 200) {
      nama.value = responseEdit.data.data.namecategory
      rename.value = responseEdit.data.data.namecategory
    }
  } catch (error) {
    
  }
}

const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const simpanEdit = async () => {
  sendingFormLoading.value = true
  try {
    const responseSimpan = await axios.put(`/api/categories/${itemId}}`, dataEdit, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseSimpan.status == 200) {
      alert.value = ''
      alertSukses.value = 'SUKSES'
      dataEdit.namecategory = ''
      router.push(`/admin/category/${itemId}`)
    }
    sendingFormLoading.value = false
  } catch (error) {
   
    if (error.response.status == 422) {
      if (dataEdit.namecategory == '') {
        alert.value = 'ISI SEMUA FIELD FORM'
      } else {
        alert.value = 'NAMA KATEGORI TELAH ADA'
      }
    }
    sendingFormLoading.value = false
  }
}

function backToDetail(routePath) {
  router.push(routePath)
}
onMounted(() => {
  render()
})
</script>

<template>
  <main>
    <h1>Edit Kategori Kucing</h1>

    <div class="container-detail">
      <div class="alert-message-gagal" v-if="alert != ''">
        <p>{{ alert }}</p>
      </div>
      <div class="alert-message-sukses" v-if="alertSukses != ''">
        <p>{{ alertSukses }}</p>
      </div>

      <p class="label-nama">Nama Ras Kucing Saat ini</p>
      <p class="nama-category">{{ nama }}</p>
      <p class="label-rename">Nama Ras Kucing Yang Akan Diganti</p>
      <input class="input-nama-category" type="text" v-model="dataEdit.namecategory" />
    </div>

    <div class="container-edit-delete">
      <button
        type="button"
        class="btn-edit"
        @click="simpanEdit()"
        v-if="sendingFormLoading == false"
      >
        Simpan Edit
      </button>
      <button type="button" class="btn-edit" v-if="sendingFormLoading == true" disabled>
        <i class="fa-solid fa-spinner fa-xl"></i>
      </button>
      <button type="button" class="btn-kembali" @click="backToDetail(`/admin/category/${itemId}`)">
        Kembali
      </button>
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
  h1 {
    margin-bottom: 25px;
  }
  .container-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;

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
    .nama-category,
    .input-nama-category {
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      padding: 5px;
    }
  }
  .container-edit-delete {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    button {
      padding: 5px;
      width: 100%;
      border-radius: 5px;
    }
    .btn-edit {
      background-color: #ffd482;
    }
  }
}
</style>
