<script setup>
import { onMounted, reactive, ref ,inject} from 'vue'
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
    console.log(error)
  }
}

const simpanEdit = async () => {
  try {
    const responseSimpan = await axios.put(
      `/api/categories/${itemId}}`,
      dataEdit,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseSimpan.status == 200) {
      const containerAlert = document.querySelector('.alert-message')
      containerAlert.innerHTML = '<p style="color:green">Berhasil mengubah kategori ras kucing</p>'
      const inputNama = document.querySelector('.input-nama-category')
      inputNama.value = ''
    }
  } catch (error) {
    console.log(error)
    const containerAlert = document.querySelector('.alert-message')
    containerAlert.innerHTML = '<p style="color:red">Kategori ras kucing tidak boleh sama atau tidak boleh kosong</p>'
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
    <h1>Edit Kategori Ras Kucing</h1>

    <div class="container-detail">
      <div class="alert-message"></div>

      <p class="label-nama">Nama Ras Kucing Saat ini</p>
      <p class="nama-category">{{ nama }}</p>
      <p class="label-rename">Nama Ras Kucing Yang Akan Diganti</p>
      <input class="input-nama-category" type="text" v-model="dataEdit.namecategory" />
    </div>

    <div class="container-edit-delete">
      <button type="button" class="btn-edit" @click="simpanEdit()">Simpan Edit</button>
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
