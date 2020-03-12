const isAuthenticated = (user) => {
  if (user) {
    return true
  } else {
    return false
  }
}

module.exports = { isAuthenticated };
