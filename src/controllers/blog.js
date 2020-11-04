const {blogs} = require('../db/db');
const passport = require('passport');

module.exports = app => {

    app.get('/blogs', async (request, response) => {
        const blog = await blogs.findAll({});
        if(blog){
            response.status(200).send(blog);
        } else {
            response.send("No blog Found");
        }
    });

    app.get('/blogs/:id', async (request, response) => {
        const {id} = request.params;
        const blog = await blogs.findOne({where:{id}});
        if(blog){
            response.status(200).send(blog);
        } else {
            response.send("No blog Found");
        }
    });

    app.post("/blogs", passport.authenticate("jwt", { session: false }),
        async function (request, response) {
        const { body } = request;
        const { content, description } = body;
        console.log(request.user);

        const createdblog = await blogs.create({
            author : request.user.id,
            content,
            description,
        });
        response.status(201).send(createdblog);
    });

    app.put("/blogs/:id", passport.authenticate("jwt", {session : false}),
        async function (request, response) {
            const {id} = request.params;
            const { content, description } = request.body;
            const blog = await blogs.findOne({where:{id}});
            if(blog){
                if(blog.author === request.user.id) {

                   blog.content = content ? content : blog.content;
                   blog.description = description ? description : blog.description;

                    await blog.save();
                    response.send("Successfully Updated " + blog );
                } else {
                    response.send("This blog doesn't belongs to you");
                }
            } else  {
                response.send("No Such Blog Exists...");
            }
        }
    );

    app.delete("/blogs/:id", passport.authenticate("jwt", { session: false }),
        async function (request, response) {    
            const { id } = request.params;
            const blog = await blogs.findOne({where : {id}});
            if(blog){
                if(blog.author === request.user.id) {
                    await blog.destroy();
                    response.send("Successfully deleted Id : " + blog.id );
                } else {
                    response.send("This blog doesn't belongs to you");
                }
            } else  {
                response.send("No Such Blog Exists...");
            }
      });
}