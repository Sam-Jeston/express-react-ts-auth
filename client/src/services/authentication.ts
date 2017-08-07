const axios = require('axios')

export function login(username: string, password: string) {
  return axios.post('/pub/login', {username, password}).then((d: AxiosData) => d.data)
}

export function signup(username: string, password: string, confirmPassword: string) {
  return axios.post('/pub/signup', {username, password, confirm_password: confirmPassword})
    .then((d: AxiosData) => d.data)
}
