const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last Name required'],
      trim: true
    },
    picture: {
      type: String
    },
    gender: {
      type: String,
      default: 'Male'
    },
    telephone: {
      type: String
    },
    address: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [false, 'Password required']
    },
    height: {
      type: Number,
      required: [false, 'height required']
    },
    position: {
      type: String,
      required: [false, 'position required']
    },
    Team: {
      type: String,
      required: [false, 'Team required']
    },
    rightFooted: {
      type: Boolean,
      required: false,
      default: true
    },
    weight: {
      type: Number,
      required: [false, 'weight required']
    },
    shirtNumber: {
      type: Number,
      required: [false, 'shirt Number required']
    },
    age: {
      type: Number,
      required: [false, 'age required']
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'coach', 'parent', 'player', 'user'],
      defalut: 'user',
      required: [true, 'Role required']
    },
    accountType: {
      type: String,
      enum: ['facebook', 'google', 'local'],
      defalut: 'local',
      required: [true, 'accountType required']
    },
    enabled: {
      type: Boolean,
      required: true,
      default: false
    },
    isValid: {
      type: Boolean,
      required: true,
      default: false
    },
    confirmationToken: {
      type: String,
      required: false,
      default: null
    },
    notificationToken: {
      type: String,
      required: false,
      default: null
    },
    passwordResetExpires: {
      type: Date,
      default: null
    },
    lastLogin: {
      type: Date,
      default: Date.now()
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign(
    {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        enabled: user.enabled
      }
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 31556926 // 1 year in seconds
    }
  )
  return token
}

userSchema.statics.findByCredentials = async function (email, password) {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return null
    }
    return user
  }
  return null
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
