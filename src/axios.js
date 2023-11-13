import axios from "axios"

export default {
    install: ((app, options)=> {
        const axiosObject = axios.create({
            baseURL: options.baseURL,
        })
        axiosObject.defaults.headers.common['ngrok-skip-browser-warning']="69420"
        app.config.globalProperties.$axios =  axiosObject
        app.provide('axios',axiosObject)
    })
}
