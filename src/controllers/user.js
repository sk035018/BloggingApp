const {users} = require('../db/db');
const md5 = require('md5');
const {filteredUser} = require('../utility');
const passport = require('passport');

module.exports = app => {
    app.get('/user/:id', async (request, response) => {
        const {id} = request.params;
        const user = await users.findOne({where:{id}});
        if(user){
            const showUser = filteredUser(user);
            response.status(200).send(showUser);
        } else {
            response.send("No User Found");
        }
    });

    app.post("/auth/signup", async function (request, response) {
        const { body } = request;
        const { first_name, last_name, email, password } = body;

        const createdUser = await users.create({
        first_name,
        last_name,
        email,
        password: md5(password),
        });
        const showUser = filteredUser(createdUser);
        response.status(201).send(showUser);
    });

    app.delete("/user/:id", async function (request, response) {
        const { id } = request.params;
        const user = await users.findOne({where : {id}});
        await user.destroy();
        response.send("Successfully deleted Id : " + user.id );
      });

    app.delete("/user/:id", passport.authenticate("jwt", { session: false }),
        async function (request, response) {    
            const { id } = request.params;
            const user = await users.findOne({where : {id}});
            if(user){
                if(user.id === request.user.id) {
                    await user.destroy();
                    response.send("Successfully deleted Id : " + user.id );
                } else {
                    response.send("Log In with your Id First than try to delete your account");
                }
            } else  {
                response.send("No Such User Exists...");
            }
      });

}