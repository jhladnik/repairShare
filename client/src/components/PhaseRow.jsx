import {FaTrash} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_PHASE } from '../mutations/phaseMutations';
import { GET_PHASES } from '../queries/phaseQueries';
import { GET_TASKS } from '../queries/taskQueries';


export default function PhaseRow({phase}) {
    const [deletePhase] = useMutation(DELETE_PHASE, {
        variables: { id: phase.id },
        //reload page after delete and delete all tasks associated
        refetchQueries: [{ query: GET_PHASES }, {query: GET_TASKS}],
    });

    return (
        <tr>
            <td>{ phase.number}</td>
            <td>{ phase.description}</td>
            <td>{ phase.status}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deletePhase}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    )
}
