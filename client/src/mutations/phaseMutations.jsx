import { gql } from "@apollo/client";


// for form input
const ADD_PHASE = gql`
    mutation addPhase($number: String!, $description: String!){
        addPhase(number: $number, description: $description)
        {
            id
            number
            description
            status
        }
    }
`

//for delete button
const DELETE_PHASE = gql`
    mutation deletePhase($id: ID!){
        deletePhase(id: $id){
            id
            number
            description
            status
        }
    }
`;

export { ADD_PHASE, DELETE_PHASE }