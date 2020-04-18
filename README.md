# Mentor/Mentee Matching App

## What is it?
 A mentor/mentee pairing app for students organizations. Aiming to allow students to keep up with a student organization more easily and become more involved by advertising events. Essentially a social media app for student organizations.

## Features

  - Matching based on registration answers
  - Choice of string comparison matching algorithm 
  - File upload for profile pictures, creating events, posting pictures
  - Instant messaging using socket.io

More features are being developed, such as commenting on posts made by others within the social media feed of the app.

## Tech

This app uses the MERN Stack along with other technologies to create a RESTful API:

* React.js/Redux - Used for building the user-interface
* node.js - evented I/O for the backend
* express - fast node.js network app framework 
* MongoDB - NoSQL database 
* socket.io - For creating the instant messaging feature

### Installation
Requires [Node.js](https://nodejs.org/) v8+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd acebook
# Install backend dependencies
$ npm install
# Install frontend dependencies
$ cd client
$ npm install
$ npm run build
$ cd ..
# Start frontend and backend
$ npm run start
```
