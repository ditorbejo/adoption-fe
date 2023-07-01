<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const token = localStorage.getItem('token')
const route = useRoute()
const itemId = route.params.id
const nama= ref()
const rename = ref()

const dataEdit = reactive({
  namecategory: rename
})
const render = async () => {
  try {
    const responseEdit = await axios.get(`http://127.0.0.1:8000/api/categories/${itemId}}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseEdit.status == 200) {
      nama.value = responseEdit.data.data.namecategory
      rename.value = responseEdit.data.data.namecategory
    }
  } catch (error) {
    console.log(error)
  }
}

const simpanEdit = async () => {
  try {
    const responseSimpan = await axios.put(`http://127.0.0.1:8000/api/categories/${itemId}}`,dataEdit, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseSimpan.status == 200) {
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = '<p style="color:green">Berhasil mengubah kategori ras kucing</p>'
      const inputNama = document.querySelector('.input-nama-category')
      inputNama.value = ''
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
    <h1>Edit Kategori Ras Kucing</h1>

    <div class="container-detail">
      <div class="alert-message"></div>

      <p class="label-nama">Nama Ras Kucing Saat ini</p>
      <p class="nama-category">{{ nama}}</p>
      <p class="label-rename">Nama Ras Kucing Yang Akan Diganti</p>
      <input class="input-nama-category" type="text" v-model="dataEdit.namecategory" />
    </div>

    <div class="container-edit-delete">
      <button type="button" class="btn-edit" @click="simpanEdit()">Simpan Edit</button>
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
  h1 {
    margin-bottom: 25px;
  }
  .container-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
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
    button {
      padding: 5px;
      width: 100%;
      border-radius: 5px;
      background-color: #ffd482;
    }
  }
}
</style>
