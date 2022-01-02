const logout = (req, res) => {
  req.sessionID = null
  res.status(200).send({ message: 'Logout success' })
}

exports.logout = logout
