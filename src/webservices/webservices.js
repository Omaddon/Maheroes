import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
    axios.defaults.baseURL = constants.BASE_URL
    axios.defaults.headers.post['a-Type'] = 'application/json'
    axios.defaults.headers.common['Referer'] = 'http://kcheroes.com'
}

export function fetch(url) {
    return new Promise(function(resolve, reject) {
        axios.get(url)
            .then( response => {
                if (response.data)
                    resolve(response.data)
                else
                    reject(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function post(url, data) {
    return new Promise(function(resolve, reject) {
        axios.post(url, data)
            .then( response => {
                if (response.data)
                    resolve(response.data)
                else
                    reject(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function remove(url, data) {
    return new Promise(function(resolve, reject) {
        axios.delete(url, data)
            .then( response => {
                if (response.data)
                    resolve(response.data)
                else
                    reject(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}