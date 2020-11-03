# BloggingApp
Node Evaluation

******************************************************************************************************

## Using .env 
PORT = This is the port where api will run
HOST = This is the host ip address
DB_PORT = This is the port number where postgres is running
USER_NAME = This is the username of postgres server
PASSWORD = This is your password 
DATABASE = This is the name of your database

## Urls
/auth/login (post) {email, password}

/blog (get)
/blog/:id (get)
/blog (post)   {content, description}
/blog/:id (delete)

/user/:id (get)
/user (post)  {first_name, last_name, email, password}
/user/:id (delete)