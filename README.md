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

### Get descriptions, names, and statuses of all tasks
{
    tasks {
        name
        description
        status
    }
}

### Get numbers and statuses of all phases
{
    phases {
        number
        status
    }
}

### Get individual task name, status, description, and phase number
{
    task(id: ) {
        name
        status
        description
        phase{
            number
        }
    }
}

### Delete a phase and return the id and number
mutation {
    deletePhase(id: ) {
        id
        number
    }
}

### Delete a task and return the id
mutation {
    deleteTask(id: ) {
        id
    }
}

### Create a new phase and return all data
mutation {
    addPhase (number: "1", description: "This is the first of 4 phases") {
        id
        number
        description
        status
    }
}

### Create new task and return all data
mutation {
    addTask(name: "MVP", description: "Create minimum viable product", phaseId: "#") {
        id
        name
        description
        status
        phase {
            number
        }
    }
}

### Update a task status and return the phaseId it belongs to with the status of the task
mutation {
    updateTask(id: "#", status: completed) {
        status
        phase {
            id
        }
    }
}