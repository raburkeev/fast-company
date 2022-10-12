/*eslint-disable*/
import axios from 'axios'
import {toast} from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
            const expiresDate = localStorageService.getExpiresDateToken()
            const refreshToken = localStorageService.getRefreshToken()
            if (refreshToken && expiresDate > Date.now()) {
                const {data} = await httpService.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map(key => ({
            ...data[key]
        }))
        : data
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = {content: transformData(res.data)}
        }
        return res
    },
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500

        if (!expectedErrors) {
            console.log(error)
            toast.error('Something was wrong. Try it later')
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}

export default httpService
