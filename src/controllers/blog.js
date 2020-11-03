const {blogs} = require('../db/db');
const passport = require('passport');
const {authorizedUser} = require('./auth');

module.exports = app => {

    app.get('/blog', async (request, response) => {
        const blog = await blogs.findAll({});
        if(blog){
            response.status(200).send(blog);
        } else {
            response.send("No blog Found");
        }
    });

    app.get('/blog/:id', async (request, response) => {
        const {id} = request.params;
        const blog = await blogs.findOne({where:{id}});
        if(blog){
            response.status(200).send(blog);
        } else {
            response.send("No blog Found");
        }
    });

    app.post("/blog", passport.authenticate("jwt", { session: false }),
        async function (request, response) {
        const { body } = request;
        const { content, description } = body;

        const createdblog = await blogs.create({
            author : authorizedUser.id,
            content,
            description,
        });
        response.status(201).send(createdblog);
    });

    app.delete("/blog/:id", passport.authenticate("jwt", { session: false }),
        async function (request, response) {
        const { id } = request.params;
        const blog = await blogs.findOne({where : {id}});
        if(blog){
            await blog.destroy();
            response.send("Successfully deleted Id : " + blog.id );
        } else  {
            response.send("No Such Blog Exists...");
        }
      });
}