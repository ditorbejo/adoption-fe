import axios from "axios"

export default {
    install: ((app, options)=> {
        const axiosObject = axios.create({
            baseURL: options.baseURL,
        })
        app.config.globalProperties.$axios =  axiosObject
        app.provide('axios',axiosObject)
    })
}
