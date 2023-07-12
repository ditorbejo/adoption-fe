<script setup>
import axios from 'axios'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import Pusher from 'pusher-js'

const token = localStorage.getItem('token')
const messages = ref([])
const route = useRoute()
const userId = route.params.id

const fetchMessages = async () => {
  try {
    const responseMessages = await axios.get(`http://127.0.0.1:8000/api/messages/${userId}`, {
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
const sendToUser = async () => {
  try {
    const responseMessages = await axios.post(
      `http://127.0.0.1:8000/api/messages/${userId}`,
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
            <label class="isi-pesan-user" for="">{{ message.user_name }} {{ message.role }}</label>
            <p class="isi-pesan-user">Pesan: {{ message.message }}</p>
          </div>
          <div class="container-chat" v-else>
            <label class="isi-pesan-admin" for="">{{ message.user_name }} {{ message.role }}</label>
            <p class="isi-pesan-admin">Pesan: {{ message.message }}</p>
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
  padding: 10px 20px;
  max-width: 1920px;
  margin: 0 auto;
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
      height: 600px;
      .message {
        background-color: yellow;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        .container-chat {
          border-radius: 5px;
          background-color: rgb(255, 255, 255);
        }
        .isi-pesan-user {
          display: flex;
          padding: 5px;
          justify-content: flex-end;
        }
        .isi-pesan-admin {
          display: flex;
          padding: 5px;
          justify-content: flex-start;
          background-color: yellow;
        }
      }
    }
    .box-text {
      margin-top: 5%;
      display: flex;
      flex-direction: row;
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
