import {gql} from "@apollo/client";

const ADD_TASK = gql`
    mutation AddTask ($name: String!, $description: String!, $status: TaskStatus!, $phaseId: ID!){
        addTask(name: $name, description: $description, status: $status, phaseId: $phaseId){
            id
            name
            description
            status
            phase {
                id
                number
                description
                status
            }
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask ($id: ID!, $name: String!, $description: String!, $status: TaskStatusUpdate!){
        updateTask(id: $id, name: $name, description: $description, status: $status){
            id
            name
            description
            status
            phase {
                id
                number
                description
                status
            }
        }
    }
`

export { ADD_TASK, DELETE_TASK, UPDATE_TASK };