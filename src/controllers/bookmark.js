const { bookmarks, blogs } = require("../db/db");
const passport = require('passport');

function init(app) {

    app.get("/bookmark/my",
        passport.authenticate("jwt", { session: false }),

        async function (request, response) {
            const myBookmarksList = await bookmarks.findAll({where : {user_id : request.user.id}});
            const myBookmarks = [];
            
            for(let i=0; i<myBookmarksList.length; i++) {
                const bookmark = await blogs.findOne({where : {id : myBookmarksList[i].blog_id}});
                myBookmarks.push(bookmark);
            }

            console.log(myBookmarks);
        response.status(201).send(myBookmarks);
    });

    app.post("/bookmark/:id",
        passport.authenticate("jwt", { session: false }),

        async function (request, response) {
            const createdblog = await bookmarks.create({
                blog_id : +request.params.id,
                user_id : request.user.id,
            });
        response.status(201).send(createdblog);
    });

    app.delete("/bookmark/:id",
        passport.authenticate("jwt", { session: false }),

        async function (request, response) {
            const bookmark = await bookmarks.findOne({where : {blog_id : request.params.id, user_id : request.user.id}});
            if(bookmark) {
                bookmark.destroy();
                response.status(201).send("Successfully Removed Bookmark");
            }
            response.status(401).send("No Such Bookmark Found");
    });
}

module.exports = {
    init,
}