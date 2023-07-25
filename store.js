import { reactive, ref } from 'vue'

export const statusLogin = ref(false)

export const setIsLoggedIn = (value) => {
    statusLogin.value = value
}

export const stateLogin = reactive({
    login: false
})
