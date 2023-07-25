<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const dataKategori = reactive({
  namecategory: ''
})

const router = useRouter()

const token = localStorage.getItem('token')
async function submit() {
  try {
    const responseTambahKategori = await axios.post(
      'http://127.0.0.1:8000/api/categories',
      dataKategori,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseTambahKategori.status == 200) {
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = `<p style="color:green;"> Telah Berhasil Mendaftarkan Kategori</p>`
      dataKategori.namecategory = ''
      setTimeout(() => {
        router.push('/admin/list-kategori')
      }, 2000)
    }
  } catch (error) {
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = `<p style="color:red;"> Wajib diisi atau Nama Kategori sudah ada</p>`
  }
}
</script>

<template>
  <main class="tambah-kategori">
    <h1>Form Tambah Kategori Kucing</h1>

    <div class="container-form">
      <div class="alert-message"></div>

      <form action="">
        <label for="">Nama ras kucing</label>
        <input
          type="text"
          placeholder="Masukan nama ras kucing"
          v-model="dataKategori.namecategory"
        />

        <div class="container-button">
          <button type="button" @click="submit()">Tambah</button>
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
