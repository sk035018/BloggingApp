require('dotenv').config();

const express = require('express');
const passport = require('passport');
const {Init} = require('./src/db/db');
const {users} = require('./src/db/db');
const userContoller = require('./src/controllers/user');
const blogController = require('./src/controllers/blog');
const {init} = require('./src/controllers/auth');
const {SIGNING_KEY, filteredUser} = require('./src/utility');

const JwtStrategy = require("passport-jwt").Strategy,
        ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SIGNING_KEY,
}

const app = express();
const PORT = process.env.PORT;

Init().then(console.log).catch(console.log);

passport.use(
    new JwtStrategy(options, async function (payload, done) {
      const user = await users.findOne({ id: payload.id });
  
      if (!user) {
        done(null, false);
      }
  
      done(null, filteredUser(user));
    })
  );

app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());

userContoller(app);
blogController(app);
init(app);

app.get('/', (request, response) => {
    response.status(200).send("EveryThing is Fine...");
});

app.listen(PORT, ()=> {
    console.log("Server Started...");
})