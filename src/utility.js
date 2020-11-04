const jwt = require('jsonwebtoken');

// Removing password from user
function filteredUser(user) {
    const {password, ...rest} = JSON.parse(JSON.stringify(user));
    return rest;
}

function generateJWT(payload) {
    return jwt.sign(payload, process.env.SIGNING_KEY, { expiresIn: "1d" });
  }

module.exports = {
    filteredUser,
    generateJWT,
}