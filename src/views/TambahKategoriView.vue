<script setup>
import { reactive, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const dataKategori = reactive({
  namecategory: ''
})

const router = useRouter()

const token = localStorage.getItem('token')

const alert = ref('')
const alertSukses = ref('')
const sendingFormLoading = ref(false)
const submit = async () => {
  sendingFormLoading.value = true
  try {
    const responseTambahKategori = await axios.post('/api/categories', dataKategori, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseTambahKategori.status == 200) {
      alert.value = ''
      alertSukses.value = 'SUKSES MENAMBAHKAN KATEGORI'
      dataKategori.namecategory = ''
      setTimeout(() => {
        router.push('/admin/list-kategori')
      }, 1000)
    }
    sendingFormLoading.value = false
  } catch (error) {
    if (error.response.status == 422) {
      if (dataKategori.namecategory == '') {
        alert.value = 'ISI SEMUA FIELD FORM'
      } else {
        alert.value = 'NAMA KATEGORI TELAH ADA'
      }
    }
    sendingFormLoading.value = false
  }
}
</script>

<template>
  <main class="tambah-kategori">
    <h1>Tambah Kategori Kucing</h1>

    <div class="container-form">
      <div class="alert-message-gagal" v-if="alert != ''">
        <p>{{ alert }}</p>
      </div>
      <div class="alert-message-sukses" v-if="alertSukses != ''">
        <p>{{ alertSukses }}</p>
      </div>

      <form action="">
        <label for="">Nama ras kucing</label>
        <input
          type="text"
          placeholder="Masukan nama ras kucing"
          v-model="dataKategori.namecategory"
        />

        <div class="container-button">
          <button type="button" @click="submit()" v-if="sendingFormLoading == false">Tambah</button>
          <button type="button" v-if="sendingFormLoading == true" disabled>
            <i class="fa-solid fa-spinner fa-xl"></i>
          </button>
        </div>
      </form>
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
    form {
      display: flex;
      flex-direction: column;
      padding: 10px 5px;
      gap: 10px;
      input,
      button {
        border-radius: 10px;
        padding: 10px;
      }
      button {
        width: 100px;
        background-color: #ffd482;
      }
      .container-button {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
