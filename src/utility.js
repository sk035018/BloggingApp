const jwt = require('jsonwebtoken');
const SIGNING_KEY = 'uhsfgieukgkwralythgesjtgserystuesfeiurtgeiryersfgsidkgekruguy';

// Removing password from user
function filteredUser(user) {
    const {password, ...rest} = JSON.parse(JSON.stringify(user));
    return rest;
}

function generateJWT(payload) {
    return jwt.sign(payload, SIGNING_KEY, { expiresIn: "1d" });
  }

module.exports = {
    filteredUser,
    generateJWT,
    SIGNING_KEY,
}