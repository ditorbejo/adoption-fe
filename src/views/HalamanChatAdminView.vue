<script setup>
import Pusher from 'pusher-js'
import { onMounted, onUnmounted, reactive, ref, inject } from 'vue'

const axios = inject('axios')
const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY
const pusherCluster = import.meta.env.VITE_PUSHER_CLUSTER

const messages = ref([])
const listUserMessage = ref([])
const userId = ref()

const token = localStorage.getItem('token')

const renderUserChat = async () => {
  try {
    const responseUser = await axios.get('/api/getAllUser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseUser.status == 200) {
      listUserMessage.value = responseUser.data.data
      console.log(responseUser.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const dataMessage = reactive({
  message: ''
})

const sendingFormLoading = ref(false)
const sendMessage = async (userId) => {
  sendingFormLoading.value = true
  try {
    const responseSendMessage = await axios.post(`/api/messages/${userId}`, dataMessage, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseSendMessage.status == 200) {
      console.log('berhasil ditambahkan')
      dataMessage.message = ''
    }
    sendingFormLoading.value = false
  } catch (error) {
    console.log(error)
  }
  sendingFormLoading.value = false
}
const roleUserName = ref()
let channel
const fetchMessages = async (user_id) => {
  try {
    userId.value = user_id
    pusher.unsubscribe(`lorem-ipsum-chat-${userId.value}`)
    const responseMessages = await axios.get(`/api/messages/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (responseMessages.status == 200) {
      messages.value = responseMessages.data.data
      console.log(responseMessages.data.data)
      const filterRoleUser = responseMessages.data.data.filter((user) => user.role == 'user')
      const firstFilteredData = filterRoleUser.find(() => true)
      roleUserName.value = firstFilteredData.user_name

      channel = pusher.subscribe(`lorem-ipsum-chat-${userId.value}`)
      channel.bind('chat-Cattery', (data) => {
        console.log(data.resourceData)
        messages.value.push(data.resourceData)
        console.log(messages.value)
      })
      channel.bind('pusher:subscription_succeeded', () => {
        console.log('Subscribe berhasil')
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const backToListChat = () => {
  userId.value = null
}

const pusher = new Pusher(pusherAppKey, { cluster: pusherCluster })

onMounted(async () => {
  await renderUserChat()
  var channelNewUser = pusher.subscribe('new-user-chat')
  channelNewUser.bind('new-Chat-Cattery', () => {
    renderUserChat()
  })
})

onUnmounted(() => {
  listUserMessage.value.forEach((user) => {
    pusher.unsubscribe(`lorem-ipsum-chat-${user.user_id}`)
  })
})
</script>

<template>
  <main>
    <h1>Halaman Chat Admin</h1>

    <div class="container-chat">
      <div class="list-user-chat" v-if="userId == null">
        <p>List User Chat</p>

        <div class="alert-message" v-if="listUserMessage.length == 0">
          <p>BELUM ADA PERTANYAAN USER</p>
        </div>

        <div class="list-chat" v-for="user in listUserMessage" :key="user.id">
          <div class="user-box" @click="fetchMessages(user.id)">
            <div class="container-name">
              <div class="detail-name">
                <p class="role">{{ user.role }}</p>
                <p class="name">{{ user.name }}</p>
              </div>
              <p class="email">Email: {{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="box-chat" v-else>
        <button class="button-back" @click="backToListChat()">Kembali ke Daftar Chat</button>
        <p class="judul-box-chat">{{ roleUserName }}</p>

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
          <button type="button" @click="sendMessage(userId)" v-if="sendingFormLoading == false">
            <i class="fa-regular fa-paper-plane fa-xl"></i>
          </button>
          <button type="button" v-if="sendingFormLoading == true" disabled>
            <i class="fa-solid fa-spinner fa-xl"></i>
          </button>
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
  height: 100vh;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 50px auto 0 auto;
  .container-chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 10px;
    .list-user-chat {
      padding: 10px;
      width: 100%;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .alert-message {
        background-color: #fee45e;
        padding: 10px;
      }
      .list-chat {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #f79327;
        border: 1px;
        padding: 5px;
        .user-box {
          background-color: rgb(252, 252, 252);
          padding: 10px;
        }
        .container-name {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .detail-name {
            display: flex;
            flex-direction: row;
            text-transform: capitalize;
            p {
              width: 100%;
              border: 1px solid #f79540;
              padding: 10px;
            }
          }
          .email {
            padding: 5px;
            width: 100%;
            border: 1px solid #f79540;
          }
        }
      }
    }
    .box-chat {
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      .button-back {
        padding: 10px;
        border-radius: 10px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        background-color: #fffec4;
      }
      .judul-box-chat {
        padding: 10px;
        display: flex;
        justify-content: center;
        border: 1px solid #f79327;
        margin: 10px 0;
        text-transform: capitalize;
      }
      .isi-chat {
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow: auto;
        scroll-behavior: smooth;
        margin-bottom: 200px;
        .message {
          border: 2px solid#f79540;
          padding: 5px;
          border-radius: 10px;
          .container-chat {
            border-radius: 5px;
            padding: 5px;
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
                background-color: #fee45e;
                padding: 5px;
              }
            }
          }
          .isi-pesan-user {
            display: flex;
            padding: 10px;
            justify-content: flex-end;
            background-color: #fdfdfd;
          }
          .isi-pesan-admin {
            display: flex;
            padding: 10px;
            justify-content: flex-start;
            background-color: #fff1aa;
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
          padding: 10px;
          width: 80%;
        }
        button {
          width: 20%;
          padding: 5px;
        }
      }
    }
  }
}
</style>
