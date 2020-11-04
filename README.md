# BloggingApp
Node Evaluation

******************************************************************************************************

## Using .env 
PORT = Express App Port
HOST = Express App Host
DB_PORT = Database Port
USER_NAME = Postgres Username
PASSWORD = Postgres Password 
DATABASE = Database Name
SIGNING_KEY = Signing Key Used in JWT

## Urls
/auth/signup (post) {first_name, second_name, email, password}
/auth/login (post) {email, password}

/blogs (get)
/blogs/:id (get)
/blogs (post)   {content, description}
/blogs/:id (delete)

/user/:id (get)
/user/:id (delete)

/bookmark/my (get) Gives all your bookmarks
/bookmark/:id (post) Adds your bookmark
/bookmark/:id (delete) Removes your bookmark