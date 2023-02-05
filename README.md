# Simple-User-Auth-and-Creation-API

### About
A simple api for creating and authenticating a user for an express application with a postgresql database.

### Stack
- Postgresql
- NodeJs
- Express

### Run on Local
- Clone or download repo
- Run npm install from root of project to install dependencies
- Ensure you have postgres and psql installed on your machine
- Create a database called admin locally
- Set up environment variables accordingly
- run 'npm run build' from project root
- run 'node build/server.js' from project root

### url
Available endpoints are
 ``` 
   ##### Fetch all users
   
   Endpoint: http://127.0.0.1:3000/api/getallusers
   
   Method: Post
   
   
   ##### Login
   
   Endpoint http://127.0.0.1:3000/api/login
   
   Method: Post
   
   Payload {
        username: "username",
        password: "password"
   }

   ##### Sign Up
   
   Endpoint http://127.0.0.1:3000/api/signup
   
   Method: Post
   
   Payload {
        username: "username",
        password: "password",
        email: "email",
        sex: "sex"
   }
  ```
