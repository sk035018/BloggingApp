const { users } = require("../db/db");
const md5 = require("md5");
const { generateJWT, filteredUser } = require("../utility");
const passport = require("passport");
let authorizedUser = {};

function init(app) {
        app.post("/auth/login", async function (request, response) {
            const { email, password } = request.body;
            const user = await users.findOne({ where: { email } });

            if (!user || user.password !== md5(password)) {
                authorizedUser = {};
            response
                .status(401)
                .send({ message: "Either username or password is incorrect" });
            }

            const jwt = generateJWT(filteredUser(user));
            authorizedUser = user;
            response.status(200).send({ token: jwt, user: filteredUser(user) });
        });
}

module.exports = {
    init,
    authorizedUser,
}