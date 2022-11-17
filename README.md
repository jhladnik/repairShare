# repairShare

## Goal: Create a backend written in GraphQL
### Every startup goes through several stages, in every stage there are steps that need to be accomplished.  The app should be able to track this progress.

## This app should:
- Work
- Every phase can have an unlimited amount of tasks
- If the tasks in one phase are completed, the next phase will unlock
- Previous phase MUST be completed to mark off any tasks in the next phase

## To run this app, install the following:
- npm init
- npm i express
- npm i express-graphql
- npm i mongoose
- npm i cors
- npm i colors
- npm i -D dotenv

## Then:
- in package.json file, in "scripts", delete "test":... and replace with "start": "node server/index.js",

## You will aslo need to add a .env file to the server folder containing the following:
- PORT = 2121
- MONGO_URI = (your connection key here after you set the database up in MongoDB)
