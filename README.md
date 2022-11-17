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
- npm i graphql
- npm i mongoose
- npm i cors
- npm i colors
- npm i -D dotenv

## Then:
- in package.json file, in "scripts", delete "test":... and replace with "start": "node server/index.js",

## You will aslo need to add a .env file to the server folder containing the following:
- PORT = 2121
- MONGO_URI = (your connection key here after you set the database up in MongoDB)

## For testing the API, use GraphiQL:
- In the browser, type localhost:2121/graphql

# Query and mutation gist
## Running GraphQL Queries & Mutations:
### Get numbers of all phases
{
    phases {
        number
    }
}
### Get tasks of a specific phase
{
    phase(id: ) {
        number
        tasks
    }
}
### Get descriptions and status of all tasks
{
    tasks {
        description
        status
    }
}
### Get numbers and status of all phases
{
    phases {
        number
        status
    }
}
### Get individual task status with the description and phase number
{
    task(id: ) {
        status
        description
        phase{
            number
        }
    }
}
### Delete a phase and return the id
mutation {
    deletePhase(id: ) {
        id
    }
}
### Create a new phase and return all data
mutation {
    addPhase(number: "1", description: "This is the first of 4 phases", status: "Not Completed") {
        number
        description
        status
    }
}
### Create new task and return the description and status
mutation {
    addTask(description: "Create MVP", status: "Not Completed") {
        description
        status
    }
}
### Update a task status and return the phaseID it belongs to with the status of the task
{
    mutation {
        updateTask(status: "Completed") {
            phaseID
            status
        }
    }
}