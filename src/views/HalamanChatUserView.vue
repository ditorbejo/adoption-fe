<script setup>
import Pusher from 'pusher-js'
import { onMounted, onUnmounted, reactive, ref ,inject} from 'vue'
import { useRoute } from 'vue-router';

const axios = inject('axios')
const token = localStorage.getItem('token')
const userId = ref()
const userRole = ref()
const userName = ref()
const messages = ref([])
const route = useRoute()

const renderUserId = async () => {
  try {
    const responseUser = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseUser.status == 200) {
      userId.value = responseUser.data.id
      userRole.value = responseUser.data.role
      userName.value = responseUser.data.name
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchMessages = async () => {
  try {
    const responseMessages = await axios.get('/api/messages', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseMessages.status == 200) {
      //   console.log(responseMessages.data.data)
      messages.value = responseMessages.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

const dataMessage = reactive({
  message: ''
})

const sendMessage = async () => {
  try {
    const responseSendMessage = await axios.post(
      '/api/messages',
      dataMessage,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseSendMessage.status == 200) {
      console.log('berhasil ditambahkan')
      dataMessage.message = ''
    }
  } catch (error) {
    console.log(error)
  }
}

const petName = ref('')
const fetchPetDetail = async (petId) => {
  try {
    const responseDetailKucing = await axios.get(`/api/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseDetailKucing.status == 200) {
      console.log(responseDetailKucing.data.data)
      petName.value = responseDetailKucing.data.data.name
    }
  } catch (error) {
    console.log(error)
  }
}
const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY
const pusherCluster = import.meta.env.VITE_PUSHER_CLUSTER
let channel
const pusher = new Pusher(pusherAppKey, { cluster: pusherCluster })

onMounted(async () => {
  await renderUserId()
  fetchMessages()
  channel = pusher.subscribe(`lorem-ipsum-chat-${userId.value}`)
  channel.bind('chat-Cattery', (data) => {
    console.log(data.resourceData)
    messages.value.push(data.resourceData)
    console.log(messages.value)
  })
  channel.bind('pusher:subscription_succeeded', () => {
    console.log('Subscribe berhasil')
  })

  const petId = route.query.petId
  if(petId){
    await fetchPetDetail(petId)
    dataMessage.message =  `Halo saya ingin bertanya untuk kucing ${petName.value}`
  }
})
onUnmounted(() => {
  channel.unbind('chat-Cattery')
  pusher.unsubscribe(`lorem-ipsum-chat-${userId.value}`)
  
})
</script>

<template>
  <main>
    <h1>Halaman Chat User</h1>

    <div class="box-chat">
      <div class="isi-chat">
        <div class="message" v-for="message in messages" :key="message.id">
          <div class="container-chat" v-if="message.role == 'user'">
            <div class="container-detail-user">
              <p class="jam-pesan">{{ message.created_at }}</p>
              <p class="user-dan-role" for="">{{ message.user_name }} {{ message.role }}</p>
            </div>
            <p class="isi-pesan-user">{{ message.message }}</p>
          </div>
          <div class="container-chat" v-else>
            <div class="container-detail-user">
              <p class="jam-pesan">{{ message.created_at }}</p>
              <p class="user-dan-role" for="">{{ message.user_name }} {{ message.role }}</p>
            </div>
            <p class="isi-pesan-admin">{{ message.message }}</p>
          </div>
        </div>
      </div>

      <div class="box-text">
        <textarea name="" id="" cols="30" rows="3" v-model="dataMessage.message"></textarea>
        <button type="button" @click="sendMessage()">Kirim</button>
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
  max-width: 1200px;
  margin: 50px auto 0 auto;
  .box-chat {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .isi-chat {
      display: flex;
      flex-direction: column;
      gap: 5px;
      overflow: auto;
      scroll-behavior: smooth;
      margin-bottom: 200px;
      .message {
        background-color: #f79540;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid;
        .container-chat {
          border-radius: 5px;
          padding: 5px;
          .container-detail-user {
            display: flex;
            justify-content: space-between;
            .user-dan-role {
              text-align: center;
              width: 50%;
              padding: 5px;
              background-color: #f8ff21;
              text-transform: capitalize;
            }
            .jam-pesan {
              width: 100%;
              background-color: #f8ff21;
              padding: 5px;
            }
          }
        }
        .isi-pesan-user {
          display: flex;
          padding: 10px;
          justify-content: flex-end;
          background-color: #ffe569;
        }
        .isi-pesan-admin {
          display: flex;
          padding: 10px;
          justify-content: flex-start;
          background-color: #ffe569;
        }
      }
    }
    .box-text {
      margin-top: 5%;
      display: flex;
      flex-direction: row;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #d0daee;
      textarea {
        width: 80%;
      }
      button {
        width: 20%;
        padding: 5px;
      }
    }
  }
}
</style>
