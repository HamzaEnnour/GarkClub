const isAllowed = (allowed, environment) => {
  return allowed.indexOf(environment) > -1
}

const env = async (...allowed) => {
  return (req, res, next) => {
    if (process.env.NODE_ENV && isAllowed(allowed, process.env.NODE_ENV)) next()
    else {
      res.status(403).json({ message: 'Forbidden access' })
    }
  }
}

module.exports = env
