import {gql} from '@apollo/client';

const GET_TASKS = gql`
    query getTasks {
        tasks {
            id
            name
            description
            status
        }
    }
`

const GET_TASK = gql`
    query getTask ($id: ID!) {
        task(id: $id) {
            id
            name
            description
            status
            phase {
                id
                number
                description
            }
        }
    }
`

export { GET_TASKS, GET_TASK }