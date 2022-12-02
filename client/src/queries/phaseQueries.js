import {gql} from '@apollo/client'

const GET_PHASES = gql`
    query getPhases {
        phases {
            id
            number
            description
            status
        }
    }
`

export { GET_PHASES }