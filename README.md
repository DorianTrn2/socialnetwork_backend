# NodeJS Social Network

## Project initialization

In the project folder, run ```npm install```.

### Initialize database

Ensure MongoDB service is active on your computer.

Initialize database using the following command: ```npm run initDB```.

This will create a database according to the environment variable `DATABASE_NAME` (found in `.env` file, default is `social_network_dtvh`) and populate it with some data.

### Running the application

To run the application, run ```npm run build```.

This will start the application in an url according to the environment variables `SERVER_URI` and `PORT` (found in `.env` file, default url is `http://localhost:3001`).

## Available requests

The following requests have been implemented:

Access to certain requests is limited by whether or not the user is logged in, their role or email address. Lambda users have the access to their own chats only, while admin users are able to go everywhere (even in private chats). Only admin can list users or all the chats. The user `bob` is admin and have the password `password`. The user `alice` is just an user and have the password `password`.

### Authentication

- `/auth/login`: log in with the username and the password
- `/auth/logout`: log out
- `/auth/register`: register yourself in the database, with the required values such as birthday, firstname, lastname, ...

### Events

- `/event`: list all events
- `/event/new`: create an event
- `/event/update/:event_id`: update the event with id `:event_id`
- `/event/delete/:event_id`: delete the event with id `:event_id`
- `/event/:event_id`: get the event with id `:event_id`

### Users

- `/user/myprofile`: get user profile
- `/user/update`: update user profile
- `/user/email`: get user by email

### Chats

- `/chat`: get all chats of the connected user
- `/chat/all`: get all chats (for admin)

### Messages

- `/chat/:chat_id`: get messages of chat with id `:chat_id`
- `/chat/:chat_id/new`: create a new message in the chat with id `:chat_id`
