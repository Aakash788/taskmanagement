# Task Managment System

## Description

This is a simple task management system that allows users to create, read, update, and delete tasks. The system is built using node.js and express.js for the backend and ejs for the frontend. jwt is used for authentication and authorization. The system is built using the MVC architecture. Task of users are stored in a MongoDB database. and only the user who created a task can update or delete it.

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Aakash788/taskmanagement.git \
    cd taskmanagement
    ```

2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
    - `PORT` - The port number the server will run on
    - `MONGO_URI` - The URI of the MongoDB database
    - `JWT_SECRET` - The secret key used to sign the jwt tokens
4. Run `npm start` to start the server
5. Open a browser and navigate to `http://localhost:<PORT>` to view the application
