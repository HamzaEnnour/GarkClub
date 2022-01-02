const { config } = require('../config/index')
const { axios } = require('axios')
const sendNotification = (titre, msg, tokenTo) => {
  const baseUrl = 'https://fcm.googleapis.com/fcm/send'

  const auth_token = config.firebase.token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth_token}`
  }
  const payload = {
    notification: {
      title: titre,
      body: msg,
      sender: ''
    },
    to: tokenTo?.token
  }
  return axios.post(`${baseUrl}`, payload, { headers: headers })
}
exports.sendNotification = sendNotification
