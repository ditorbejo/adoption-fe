<script setup>
import { onMounted, onUnmounted, reactive, ref ,inject} from 'vue'
import { useRoute } from 'vue-router'
import Pusher from 'pusher-js'

const axios = inject('axios')
const token = localStorage.getItem('token')
const messages = ref([])
const route = useRoute()
const userId = route.params.id

const fetchMessages = async () => {
  try {
    const responseMessages = await axios.get(`/api/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseMessages.status == 200) {
      //   console.log(responseMessages.data.data)
      messages.value = responseMessages.data.data
      console.log(responseMessages.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const dataMessage = reactive({
  message: ''
})
const sendToUser = async () => {
  try {
    const responseMessages = await axios.post(
      `/api/messages/${userId}`,
      dataMessage,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (responseMessages.status == 200) {
      console.log('berhasil ditambahkan')
      dataMessage.message = ''
    }
  } catch (error) {
    console.log(error)
  }
}

const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY
const pusherCluster = import.meta.env.VITE_PUSHER_CLUSTER

const pusher = new Pusher(pusherAppKey, { cluster: pusherCluster })

onMounted(() => {
  fetchMessages()
  var channel = pusher.subscribe(`lorem-ipsum-chat-${userId}`)
  channel.bind('chat-Cattery', (data) => {
    console.log(data.resourceData)
    messages.value.push(data.resourceData)
    console.log(messages.value)
  })
})
onUnmounted(() => {
  var channel = pusher.unsubscribe(`lorem-ipsum-chat-${userId}`)
  channel.unbind('chat-Cattery')
})
</script>
<template>
  <main>
    <h1>Chat Admin To User</h1>
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
        <button type="button" @click="sendToUser()">Kirim</button>
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
  height: 100vh;
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
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        .container-chat {
          border-radius: 5px;
          padding: 10px;
          .container-detail-user {
            display: flex;
            flex-direction: row;
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
