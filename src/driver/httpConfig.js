import Vue from 'vue'
import axios from 'axios'

const handleError = {
    'auth-error': () => {
        window.location.href = window.login_url
    },
    'client-error': () => {
        Vue.prototype.$message('服务器错误，请稍后再试', {type: 'error'})
    },
    'server-error': () => {
        Vue.prototype.$message('服务器错误，请稍后再试', {type: 'error'})
    }
}

const dispatchError = (code) => {
    if (code === 401) {
        return handleError['auth-error']
    }
    if (code >= 500) {
        return handleError['server-error']
    }
    if (code >= 400) {
        return handleError['client-error']
    }
    return handleError['client-error']
}

const onSuccess = (response) => Promise.resolve(response)

const onError = (error) => {
    const {status} = error.response

    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
        return Promise.reject(error)
    }
    console.error('HTTP error: ', error.response)
    return dispatchError(status)()
}

export default () => {
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.interceptors.request.use(config => config, (error) => Promise.reject(error))
    axios.interceptors.response.use(onSuccess, onError)
}
