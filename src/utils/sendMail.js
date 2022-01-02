const nodemailer = require('nodemailer')
const config = require('../config')
const ejs = require('ejs')
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gark.assistance@gmail.com',
    pass: 'Gark2020'
  }
})

const sendConfirmationMail = (user, token) => {
  try {
    let html = ejs.renderFile(__dirname + './../mail/activation.ejs', {
      name: `${user.firstName} ${user.lastName}`,
      link: `${config.frontHost}/football/user/confirm-register/${token}`
    })
    const mailOptions = {
      from: 'no-reply@gark-acadedmy.com', // sender address
      to: user.email, // list of receivers
      subject: 'confirmation', // Subject line
      html: html
    }
    transporter
      .sendMail(mailOptions)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  } catch (err) {
    return false
  }
}

const sendRequestResetPasswordMail = (user, token) => {
  try {
    let html = ejs.renderFile(__dirname + './../mail/resetPassword.ejs', {
      name: `${user.firstName} ${user.lastName}`,
      link: `${config.frontHost}/football/user/login/reset/${token}`
    })
    const mailOptions = {
      from: 'no-reply@gark-acadedmy.com', // sender address
      to: user.email, // list of receivers
      subject: 'Reset password link', // Subject line
      html: html
    }
    transporter
      .sendMail(mailOptions)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  } catch (err) {
    return false
  }
}

exports.sendConfirmationMail = sendConfirmationMail
exports.sendRequestResetPasswordMail = sendRequestResetPasswordMail
