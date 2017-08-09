const axios = require('axios')

export function login(email: string, password: string) {
  return axios.post('/pub/login', {email, password}).then((d: AxiosData) => d.data)
}

export function signup(email: string, password: string, confirmPassword: string) {
  return axios.post('/pub/signup', {email, password, confirm_password: confirmPassword})
    .then((d: AxiosData) => d.data)
}
