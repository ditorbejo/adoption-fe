<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')

const nameUser = ref()
const renderUser = async () => {
  try {
    const responseRenderUser = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseRenderUser.status == 200) {
      console.log(responseRenderUser.data)
      nameUser.value = responseRenderUser.data.name
    }
  } catch (error) {
    console.log(error)
  }
}

const categories = ref({})
const renderCategory = async () => {
  try {
    const responseCategory = await axios.get(`http://127.0.0.1:8000/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseCategory.status == 200) {
      console.log(responseCategory.data.data)
      categories.value = responseCategory.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
const router = useRouter()
const goToListCategory = (routePath) => {
  router.push(routePath)
}

const pets = ref({})
const renderPets = async () => {
  try {
    const responsePets = await axios.get(`http://127.0.0.1:8000/api/pets/home`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responsePets.status == 200) {
      console.log(responsePets.data.data)
      pets.value = responsePets.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
const goToListSemuaKucing = (routePath) => {
  router.push(routePath)
}
const countPetReadyAdopt = ref(0)
const renderPetsReadyAdopt = async () => {
  try {
    const responsePetsReady = await axios.get(`http://127.0.0.1:8000/api/pets?status_adopt=ready`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responsePetsReady.status == 200) {
      console.log(responsePetsReady.data.data.length)
      countPetReadyAdopt.value = responsePetsReady.data.data.length
    }
  } catch (error) {
    console.log(error)
  }
}

const countPetAdoptedAdopt = ref(0)
const renderPetsAdopted = async () => {
  try {
    const responsePetsAdopted = await axios.get(
      `http://127.0.0.1:8000/api/pets?status_adopt=Adopted`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responsePetsAdopted.status == 200) {
      console.log(responsePetsAdopted.data.data.length)
      countPetAdoptedAdopt.value = responsePetsAdopted.data.data.length
    }
  } catch (error) {
    console.log(error)
  }
}

const goToAbout = (routePath) => {
  router.push(routePath)
}
const goToDetailKucing = (routePath) => {
  router.push(routePath)
}

const openNewPage = (url) => {
  window.open(url, '_blank')
}

onMounted(() => {
  renderUser()
  renderCategory()
  renderPets()
  renderPetsReadyAdopt()
  renderPetsAdopted()
})
</script>

<template>
  <main>
    <h1>
      Hello User, <span class="name-user">{{ nameUser }}</span>
    </h1>
    <h2>Selamat Datang</h2>
    <div class="container-logo">
      <img src="../assets/images/lambang_lorem_ipsum_cattery-removebg-preview.png" alt="" />
    </div>

    <h2>List Kategori Ras Kucing</h2>
    <div class="container-kategori">
      <div class="container-list-kategori">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="goToListCategory(`/category/${category.id}`)"
        >
          {{ category.namecategory }}
        </button>
      </div>
    </div>

    <h2>Total Kucing</h2>
    <div class="container-total-kucing">
      <div class="detail-total-kucing">
        <div class="card-detail">
          <div class="icon">
            <i class="fa-solid fa-cat fa-2xl"></i>
          </div>
        </div>
        <p>Kucing Tersedia</p>
        <p class="total-pet">{{ countPetReadyAdopt }}</p>
      </div>
      <div class="detail-total-kucing">
        <div class="card-detail">
          <div class="icon">
            <i class="fa-solid fa-hand-holding-hand fa-2xl"></i>
          </div>
        </div>
        <p>Kucing Ter-adopsi</p>
        <p class="total-pet">{{ countPetAdoptedAdopt }}</p>
      </div>
    </div>

    <h2>Daftar Beberapa Kucing</h2>

    <div class="list-form-kosong" v-if="pets.length == 0">
      <p>Kucing Belum Ditambahkan</p>
    </div>

    <div class="container-list-kucing" v-if="pets.length != 0">
      <div
        class="container-detail-kucing"
        v-for="pet in pets"
        :key="pet.id"
        @click="goToDetailKucing(`/pets/${pet.id}`)"
      >
        <img :src="`http://127.0.0.1:8000${pet.image}`" alt="" />
        <p>Nama: {{ pet.name }}</p>
        <p>Color: {{ pet.color }}</p>
        <p>Category: {{ pet.categories_name }}</p>
        <P class="status-adopt">{{ pet.status_adopt }}</P>
      </div>
    </div>
    <button class="button-list-kucing" @click="goToListSemuaKucing('/list-kucing')">
      Lihat Semua Kucing
    </button>

    <h2>Mengapa Lorem Ipsum Cattery</h2>
    <p>
      Lorem Ipsum Cattery merupakan Cattery Kucing Ras Bersertifikat yang telah terdaftar pada
      Organisasi Kucing Diindonesia yaitu ICC-WCF. Indukan Pada Lorem Ipsum Cattery dengan BloodLine
      Import dari luar negeri sehingga kualitas kucing sangat baik.
    </p>

    <div class="container-card">
      <div class="card-detail">
        <div class="icon">
          <i class="fa-solid fa-cat fa-2xl"></i>
        </div>
        <p>BloodLine Import</p>
      </div>
      <div class="card-detail">
        <div class="icon">
          <i class="fa-solid fa-paw fa-2xl"></i>
        </div>
        <p>Terdaftar Member ICC-WCF</p>
      </div>
      <div class="card-detail">
        <div class="icon">
          <i class="fa-solid fa-money-bill-1-wave fa-2xl"></i>
        </div>
        <p>Biaya Adopsi Murah</p>
      </div>
      <div class="card-detail">
        <div class="icon">
          <i class="fa-solid fa-headset fa-2xl"></i>
        </div>
        <p>Bebas Bertanya Pada Cattery</p>
      </div>
    </div>
    <button class="button-info-selengkapnya" @click="goToAbout('/about')">Info Selengkapnya</button>

    <h2>Social Media</h2>
    <div class="container-card">
      <div class="card-detail" @click="openNewPage('https://www.facebook.com/mami.cattery/')">
        <div class="icon">
          <i class="fa-brands fa-square-facebook fa-2xl"></i>
        </div>
        <p>Facebook: @catless.us</p>
      </div>
      <div class="card-detail" @click="openNewPage('https://www.tiktok.com/@miaumicattery')">
        <div class="icon">
          <i class="fa-brands fa-tiktok fa-2xl"></i>
        </div>
        <p>Tiktok: @catless.us</p>
      </div>
      <div
        class="card-detail"
        @click="openNewPage('https://api.whatsapp.com/send?phone=6281249742208')"
      >
        <div class="icon">
          <i class="fa-brands fa-whatsapp fa-2xl"></i>
        </div>
        <p>Whatsapp: 081249742208</p>
      </div>
      <div class="card-detail" @click="openNewPage('https://www.instagram.com/catless.us/')">
        <div class="icon">
          <i class="fa-brands fa-instagram fa-2xl"></i>
        </div>
        <p>Instagram: @catless.us</p>
      </div>
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
  max-width: 1200px;
  margin: 50px auto 0 auto;
  h1 {
    .name-user {
      text-transform: capitalize;
    }
  }
  h2 {
    margin-top: 10px;
  }
  .container-logo {
    display: flex;
    justify-content: center;
    img {
      width: 300px;
      height: 300px;
    }
  }
  .container-kategori {
    display: flex;
    flex-direction: column;
    .container-list-kategori {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 5px;
      button {
        padding: 5px;
        border-radius: 10px;
        border: 2px solid #ffd482;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      }
      button:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

  .container-total-kucing {
    display: flex;
    flex-direction: row;
    gap: 10px;
    .detail-total-kucing {
      width: 50%;
      padding: 20px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffd482;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      .total-pet {
        padding: 10px;
        font-size: xx-large;
        font-weight: bolder;
      }
      .card-detail {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #ffd482;
        width: 100%;
        gap: 10px;
        .icon {
          padding: 20px;
        }
      }
    }
  }

  .container-list-kucing {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    .container-detail-kucing {
      display: flex;
      flex-direction: column;
      background-color: #ffd482;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      padding: 10px;
      gap: 5px;
      border-radius: 10px;
      img {
        border-radius: 10px;
        width: 100%;
        height: 300px;
        object-fit: fill;
      }
      .status-adopt {
        background-color: #85a675;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        font-size: medium;
        text-transform: capitalize;
      }
    }
  }
  .button-list-kucing {
    margin-top: 10px;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    background-color: #ffd482;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  .button-list-kucing:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .container-card {
    display: grid;
    gap: 10px;
    margin-top: 10px;
    .card-detail {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #ffd482;
      width: 100%;
      gap: 10px;
      .icon {
        padding: 20px;
      }
    }
  }
  .button-info-selengkapnya {
    margin-top: 10px;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    background-color: #ffd482;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  .button-info-selengkapnya:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
}

@media only screen and (min-width: 768px) {
  main {
    .container-list-kucing {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      .container-detail-kucing {
        img {
          border-radius: 10px;
          width: 100%;
          height: 300px;
          object-fit: fill;
        }
      }
    }
    .container-card {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media only screen and (min-width: 1024px) {
  main {
    .container-list-kucing {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      .container-detail-kucing {
        img {
          border-radius: 10px;
          width: 100%;
          height: 300px;
          object-fit: fill;
        }
      }
    }
    .container-card {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
