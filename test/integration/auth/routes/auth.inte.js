'use strict'
process.env.NODE_ENV = 'test'

const moment = require('moment')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../../src/app')
const User = require('../../../../src/models/User')
const { clearDb, closeDb } = require('../../../../src/config/db')
const {
  validateRegisterInput,
  validateLoginInput,
  validateEmail
} = require('../../../../src/models/modelsValidator/userValidator')

moment().format()
chai.should()
chai.use(chaiHttp)

const user = {
  firstName: 'seif',
  email: 'garkAcademy@garkAcademy.com',
  password: 'montest',
  confirmPassword: 'montest',
  lastName: 'garkAcademy',
  gender: 'Male',
  telephone: '92332029',
  address: '09-rue tbarka'
}

describe('User authentication', () => {
  const register = '/api/auth/register'
  const login = '/api/auth/login'
  const confirmRegister = '/api/auth/register/confirmation/'
  const resendEmailConfirmation = '/api/auth/register/resend'
  const logout = '/api/auth/logout'

  beforeEach(async () => {})
  afterEach(async () => {
    await clearDb()
  })

  before(async () => {
    await clearDb()
  })

  after(async () => {
    await clearDb()
    await closeDb()
  })

  describe('Register', () => {
    it('/register, Should create new user if all goes well, [POST=>200]', async () => {
      let result = await chai.request(app).post(register).send(user)
      result.should.have.status(200)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'Creation of user succeeded, confirm by mail.'
      )
    })

    it('/register, Must not create user if the body format is not valid with Joi, [POST=>400]', async () => {
      let invalidUserFormat = {
        firstName: 'xu',
        lastName: 'lee',
        email: 'free@yahoo',
        password: 'montest',
        confirmPassword: 'oijoijoj'
      }
      let { error } = validateRegisterInput(invalidUserFormat)
      let result = await chai
        .request(app)
        .post(register)
        .send(invalidUserFormat)
      result.should.have.status(400)
      result.body.should.be.a('object')
      result.body.message.should.equal(error.details[0].message)
    })

    it('/register, Must not create user if the email is already taken, [POST=>400]', async () => {
      await chai.request(app).post(register).send(user)
      let result = await chai.request(app).post(register).send(user)
      result.should.have.status(400)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'Email already registered. Enter an another email'
      )
    })
  })

  describe('Register confirmation', () => {
    it('register/confirmation, Should confirm registration if token is valid, [GET=>200]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      let result = await chai
        .request(app)
        .get(confirmRegister + newUser.confirmationToken)
      result.should.have.status(200)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'The account has been verified. Please log in.'
      )
    })

    it('register/confirmation, Should not confirm registration if the token is not valid (expired, bad), [GET=>404]', async () => {
      let invalidToken = 'hhgsfvcghdiopelkfjhgygetzrfdvchnjfkotp'
      let result = await chai.request(app).get(confirmRegister + invalidToken)
      result.should.have.status(404)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'We were unable to find a valid token. Your token may have expired.'
      )
    })

    it('register/confirmation, Should not confirm registration if user has already been verified, [GET=>400]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      await chai.request(app).get(confirmRegister + newUser.confirmationToken)
      let result = await chai
        .request(app)
        .get(confirmRegister + newUser.confirmationToken)
      result.should.have.status(400)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'This user has already been verified. Please log in.'
      )
    })
  })

  describe('Login', () => {
    it('/login, Should login user if all goes well, [POST=>200]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      await chai.request(app).get(confirmRegister + newUser.confirmationToken)
      let result = await chai.request(app).post(login).send({
        email: user.email,
        password: user.password
      })
      result.should.have.status(200)
      result.body.user.should.not.equal(null)
      result.body.token.should.not.equal(null)
    })

    it('/login, Should not login user if the body format is not valid with Joi, [POST=>400]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      await chai.request(app).get(confirmRegister + newUser.confirmationToken)
      let result = await chai.request(app).post(login).send({
        email: user.email, // to refacto
        password: user.role
      })
      let { error } = validateLoginInput({
        email: user.email, // to refacto
        password: user.role
      })
      result.should.have.status(400)
      result.body.message.should.equal(error.details[0].message)
    })

    it('/login, Should not login user if bad credentials (user not found), [POST=>401]', async () => {
      let result = await chai.request(app).post(login).send({
        email: 'notfoundmail@facebook.fr',
        password: 'badpassword'
      })
      result.should.have.status(401)
      result.body.message.should.equal(
        'Login failed! Check authentication credentials'
      )
    })

    it('/login, Should not login user if registration is not confirmed, [POST=>403]', async () => {
      await chai.request(app).post(register).send(user)
      let result = await chai.request(app).post(login).send({
        email: user.email,
        password: user.password
      })
      result.should.have.status(403)
      result.body.message.should.equal('Please confirm your registration')
    })

    it('/login/forgot, Should not send reset password mail if the body format is not valid with Joi, [POST=>400]', async () => {
      let badEmail = 'gark@yahoo'
      let result = await chai
        .request(app)
        .post(login + '/forgot')
        .send({
          email: badEmail
        })
      let { error } = validateEmail({
        email: badEmail
      })
      result.should.have.status(400)
      result.body.message.should.equal(error.details[0].message)
    })

    it('/login/forgot, Should send reset password mail if all goes well, [POST=>200]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      await chai.request(app).get(confirmRegister + newUser.confirmationToken)
      let result = await chai
        .request(app)
        .post(login + '/forgot')
        .send({
          email: newUser.email
        })
      result.should.have.status(200)
      result.body.message.should.equal(
        `A validation email has been sent to ${newUser.email}`
      )
    })

    it('/login/forgot, Should not send reset password mail if user email not found, [POST=>404]', async () => {
      let notFoundEmail = 'notfoundemal@yahoo.fr'
      let result = await chai
        .request(app)
        .post(login + '/forgot')
        .send({
          email: notFoundEmail
        })
      result.should.have.status(404)
      result.body.message.should.equal('No user found with this email address.')
    })

    it('/login/reset/:token, Should not reset password if confirmationToken is not valid, [POST=>404]', async () => {
      let confirmationToken = 'gkernlekgnlknelrgnr'
      let password = 'ltkgnrkgnrltkg'
      let result = await chai
        .request(app)
        .post(login + '/reset/' + confirmationToken)
        .send({ password })

      result.should.have.status(404)
      result.body.message.should.equal(
        'This token is not valid. Your token may have expired.'
      )
    })

    it('/login/reset/:token, Should reset password if all goes well, [POST=>200]', async () => {
      let password = 'newpassword'
      await chai.request(app).post(register).send(user) // register
      let newUser = await User.findOne({ email: user.email }) // find user
      await chai // confirm register
        .request(app)
        .get(confirmRegister + newUser.confirmationToken)
      await chai
        .request(app)
        .post(login + '/forgot')
        .send({
          // login forgot send mail
          email: newUser.email
        })
      let newUser1 = await User.findOne({ email: user.email })
      let result = await chai
        .request(app)
        .post(login + '/reset/' + newUser1.confirmationToken)
        .send({ password })

      result.should.have.status(200)
      result.body.message.should.equal(
        'Password has been successfully changed.'
      )
    })

    it('/login/reset/:token, Should not reset password if confirmationToken has expired, [POST=>400]', async () => {
      let password = 'newpassword'
      await chai.request(app).post(register).send(user) // register
      let registredUser = await User.findOne({ email: user.email }) // find user
      await chai // confirm register
        .request(app)
        .get(confirmRegister + registredUser.confirmationToken)
      await chai
        .request(app)
        .post(login + '/forgot')
        .send({
          // login forgot send mail
          email: registredUser.email
        })
      registredUser.passwordResetExpires = moment().subtract(13, 'hours') // change passwordResetExpires
      await registredUser.save()
      let newUser1 = await User.findOne({ email: registredUser.email })
      let result = await chai
        .request(app)
        .post(login + '/reset/' + newUser1.confirmationToken)
        .send({ password })

      result.should.have.status(400)
      result.body.message.should.equal(
        'You cannot reset your password. The reset token has expired. Please go through the reset form again.'
      )
    })

    it('/login/reset/:token, Should not reset password if bad password format, [POST=>400]', async () => {
      let password = 'newp' // not Valid (min 5 charachter)
      await chai.request(app).post(register).send(user) // register
      let newUser = await User.findOne({ email: user.email }) // find user
      await chai // confirm register
        .request(app)
        .get(confirmRegister + newUser.confirmationToken)
      await chai
        .request(app)
        .post(login + '/forgot')
        .send({
          // login forgot send mail
          email: newUser.email
        })
      let newUser1 = await User.findOne({ email: user.email })
      let result = await chai
        .request(app)
        .post(login + '/reset/' + newUser1.confirmationToken)
        .send({ password })

      result.should.have.status(400)
      result.body.message.should.equal(
        '"password" length must be at least 5 characters long'
      )
    })
  })

  describe('Resend email confirmation', () => {
    it('/register/resend, Should resend email confirmation if all goes well, [POST=>200]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      let result = await chai.request(app).post(resendEmailConfirmation).send({
        email: newUser.email
      })
      result.should.have.status(200)
      result.body.should.be.a('object')
      result.body.message.should.equal('Email of confirmation, check your mail')
    })

    it('/register/resend, Should not resend email confirmation if email format is not valid with Joi , [POST=>400]', async () => {
      let invalidEmailFormat = { email: 'gark@yahoo' }
      let { error } = validateEmail(invalidEmailFormat)
      let result = await chai
        .request(app)
        .post(resendEmailConfirmation)
        .send(invalidEmailFormat)
      result.should.have.status(400)
      result.body.should.be.a('object')
      result.body.message.should.equal(error.details[0].message)
    })

    it('/register/resend, Should not resend email confirmation if email not found , [POST=>404]', async () => {
      let notFoundEmail = { email: 'notfoundemal@yahoo.fr' }
      let result = await chai
        .request(app)
        .post(resendEmailConfirmation)
        .send(notFoundEmail)
      result.should.have.status(404)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'We were unable to find a user with that email.'
      )
    })

    it('/register/resend, Should not resend email confirmation if account has already been verified , [POST=>400]', async () => {
      await chai.request(app).post(register).send(user)
      let newUser = await User.findOne({ email: user.email })
      await chai.request(app).get(confirmRegister + newUser.confirmationToken)
      let result = await chai.request(app).post(resendEmailConfirmation).send({
        email: newUser.email
      })
      result.should.have.status(400)
      result.body.should.be.a('object')
      result.body.message.should.equal(
        'This account has already been verified. Please log in.'
      )
    })
  })

  describe('Logout', () => {
    it('/logout, Should logout user, [POST=>200]', async () => {
      let result = await chai.request(app).post(logout).send()
      result.should.have.status(200)
      result.body.should.be.a('object')
      result.body.message.should.equal('Logout success')
    })
  })
})
