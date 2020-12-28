<h1 align="center" style="color: #333333">
  <span style="color:#0f21a1">❝❞</span> WEST QUOTES
</h1>

<p style="color: #333333; font-size: 1.2rem; text-align: center">Simple application to get some <span style="text-decoration: line-through">well... ok(ish)...</span> awesome Kanye West quotes and a random image based on <em>Mr. West's</em> words</p>

<!-- Infos -->
<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=0f21a1&color=777777&label=created%20at&message=Dec%202020" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/kruchelski/west-quotes?label=updated%20at&labelColor=0f21a1&color=777777" alt="Update Date" />

  <img src="https://img.shields.io/github/v/tag/juliolmuller/the-movie-search-app?label=latest%20version&labelColor=0f21a1&color=777777" alt="Latest Version" />

  <img src="https://img.shields.io/github/license/juliolmuller/the-movie-search-app?labelColor=0f21a1&color=777777" alt="Project License" />
</p>

<div style="color:#333333">

### 😶 Why bother creating this?

This is an application that <span style="text-decoration: line-through">was developed</span> is in development as the final project for the mobile development course of the undergraduate course of Analysis and Systems Development.

The requirements of this project envolves:
- Develop a mobile application using React Native;
- Use functional components and hooks;
- Use external APIs (third party APIs or develop it's own);
- Implement a simple login system;
- Impress the teacher.


### 🖥 How do these stuff work?

The application is divided in two parts: the mobile app and the back end (API). To get Kanye's quotes the application uses the [Kanye.REST API](https://kanye.rest/) and to get an Image it uses the [Unsplash API](https://unsplash.com/developers). In the app, the users will be able to like quotes and see info about it, like how much loved is the quote or the users that liked it. The access to the two third party APIs is done through the back end; that means the mobile application send a request for a quote to the back end, which request the quote and image to the third party APIs, then get some metadata about that quote, build a nice and fluffy json object and send it back to the mobile application.

### 🚜 What is under the hood?

Although there are severak libraries involved in this application, here will be listed only the main ones:

#### Third Party APIs:
- [Kanye.REST API](https://kanye.rest/)
- [Unsplash API](https://unsplash.com/developers)

#### Backend (API):
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize ORM](https://sequelize.org/)

#### Mobile (Work in progress that actually didn't start yet):
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)

#### General
- [NPM](https://www.npmjs.com/)


<p style="padding: 10px; background-color: #eaeaea; color: #666666; font-style: italic; border-radius: 6px">
Note: Make sure you have Node v12.* or above and NPM in command line
<p>

### 🎛 So... How to set up the environment?

As mentioned before, it's required to have Node with version 12 or above and NPM in command line. For the mobile part it's required to have the [Expo CLI](https://docs.expo.io/workflow/expo-cli/), <b><em>but at this moment, the mobile part of the application is still in progress, so it won't be covered for now</em></b>.

To start the backend you need a few things:
- Setup some SGDB (like [Postgres](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/)) - The chosen SGDB must be compatible with the Sequelize Dialects (check these [Sequelize Docs](https://sequelize.org/master/manual/dialect-specific-things.html) to see the compatibility list). As the author of this project, I suggest Postgres (just because it was the one I was using and everything works super nice!).
- Create a database with the name you want (the name must be informed in the Environmental Variables - <em> this will be covered next</em> - By default the application will look for a database named 'west_quotes');
- Check the .env.example file in the root of the app. This file has instructions for correctly filling in the data and configuring the file for use by the application. Basically create a copy of the file in the same folder, rename it to only .env (just remove the .example) and put the info needed in the file (the info includes database name, user, host, access token secret and etc...).
- Install the dependencies of the application:

```bash
# In the root directory of the application:
$ npm install       # This will download and install all of the dependencies
$ npm run devStart  # This will start the application throuhg a script that runs nodemon
```

After that the application will be available for requests in localhost and the port informed by you in the .env file or in the default port 3005.

### ✉️ Backend routes

#### Main route ( / )
```
GET /
Returns a quote and an image

Headers:
Authorization: Bearer <generated jwt>
```

#### User route ( /user )
```
POST /register
Returns JSON object with the the UUID of the created user

Headers:
Content-Type: application/json

Body:
{
    "username":"name_of_a_new_user,
    "email":"email_of_a_new_user,
    "password":"password_of_a_new_user"
}
```
```
POST /login
Returns JSON object with the accessToken and the refreshToken

Headers:
Content-Type: application/json

Body:
{
    "email":"email_of_a_user,
    "password":"password_of_a_user"
}
```
```
POST /token
Return a JSON object with a new accessToken

Headers:
Content-Type: application/json

Body:
{
    "token":"refresh_token,
}
```
```
DELETE /logout/:uuid
Logout the user represented by the uuid passed in the params
```
```
DELETE /
Deletes the account of the user logged

Headers:
Authorization: Bearer <generated jwt>
```
#### Quote route ( /quote )
```
GET /
Returns JSON object with the list of the quotes liked by the user logged

Headers:
Authorization: Bearer <generated jwt>
```
```
GET /:uuid
Returns JSON object with the details of the quote represented by the uuid in the params

Headers:
Authorization: Bearer <generated jwt>
```
```
PUT /:uuid
Mark the quote represented by the uuid in the params as liked by the user logged

Authorization: Bearer <generated jwt>
```
```
DELETE /:uuid
Remove the quote represented by the uuid in the params from the quotes's like list of the user logged
```

</div>