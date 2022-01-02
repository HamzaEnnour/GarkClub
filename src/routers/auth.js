const express = require('express')
const {
  login,
  register,
  confirmRegister,
  resendEmailConfirmation,
  resetPassword,
  requestResetPassword,
  connectedUser,
  logout,
  registerCoach,
  getUsersByRole,
  registerPlayer,
  updateUserInfo,
  getNotificationToken,
  updateNotificationToken,
  editPassword,
  updateOwnerInfo,
  updateUserImage,
  updateCoachInfo,
  updatePlayerInfo
} = require('../services/auth/index')
const auth = require('../middleware/auth')
const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/register/confirmation/:token', confirmRegister)
router.post('/register/resend', resendEmailConfirmation)
router.post('/updatePlayerInfo', auth, updateUserInfo)
router.post('/login/forgot', requestResetPassword)
router.post('/editPassword', auth, editPassword)
router.post('/login/reset/:token', resetPassword)
router.post('/logout', logout)
router.post('/register/coach/:id', auth, registerCoach)
router.post('/register/player/:groupeId', auth, registerPlayer)
router.get('/user', connectedUser)
router.get('/userByRole/:role', getUsersByRole)
router.get('/token/:id', getNotificationToken)
router.post('/token/:id', updateNotificationToken)
router.put('/image/:id', updateUserImage)
router.put('/owner/:id', updateOwnerInfo)
router.put('/player/:id', updatePlayerInfo)
router.put('/coach/:id', updateCoachInfo)
module.exports = router
