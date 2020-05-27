back-end

Back-End for Spotify songs
Database, server/api, authentication, testing

Deployed at
https://bw-spotify-songs.herokuapp.com/

Project title
Spotify Songs

Motivation
The app helps share users to pick up their favorites songs , and connects them to other songs based on their taste in the music using machine learning. It provides different music from the all over the world. The ultimate goal is to enables listeners picking up their songs so easy.

Built with
Node.js
Express
SQLite
PostgreSQL
Features

What makes your project stand out?
Simplicity and reliability

Installation
Clone Fork NPM Install

API Reference
Register new user (post)
https://bw-spotify-songs.herokuapp.com/api/auth/register
##expects username, and password. 
will return user , 
if the user valid 
and also send a token to the data base
input  = {                                     output = 
	"username":"Yasir",                           { username : "Yasir" }
	"password":"pass" 
    // password will be send to the database
}



Login (post)
https://bw-spotify-songs.herokuapp.com/api/auth/login
##expects username, and password.
if the credentials are valid 
 will return a welcome message and authZ token

Get all users (get) ; restricted route, need to be have token
https://bw-spotify-songs.herokuapp.com/api/users

##Expect a header authorization token 
-- returns an array of JS object of users:

{
"id": 1,
"username": "Yasir",
},
{
"id": 2,
"username": "Luis",
}
]


Delete a user (del) ; restricted route , if the users want to delete their accounts
https://bw-spotify-songs.herokuapp.com/api/users/:id

##Expect a header authorization token 
-- returns a message:
"removed": 1 // optional if you want to display it
}

Get all user songs (get)
https://bw-spotify-songs.herokuapp.com/api/songs Doesn't expect anything -- unsecured route -- returns an array of JS object of songs

Get by song id (get)
https://bw-spotify-songs.herokuapp.com/api/songs/:id Doesn't expect anything -- unsecured route -- returns JS object of song with id matching the url


Tests
Jest
supertest
npm run server npm run test

Contribute
Contact the author - https://github.com/YasirHasn9
