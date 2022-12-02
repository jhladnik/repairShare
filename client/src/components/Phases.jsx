import { useQuery } from '@apollo/client';
import PhaseRow from './PhaseRow';
import { GET_PHASES } from '../queries/phaseQueries';
import Spinner from './Spinner';

export default function Phases() {
    const { loading, error, data } = useQuery(GET_PHASES)

    if (loading) return <Spinner />;
    if (error) return <p>I don't think this is right</p>;
    
    return  <>{ !loading && !error && (
        <table className='table table-hover mt-3'>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.phases.map(phase =>(
                    <PhaseRow key={phase.id} phase={phase} />
                ))}
            </tbody>
        </table>
    )}</>;
}
