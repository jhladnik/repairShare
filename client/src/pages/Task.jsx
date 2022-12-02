import {Link, useParams} from 'react-router-dom';
import Spinner from '../components/Spinner';
import PhaseInfo from '../components/PhaseInfo';
import DeleteTaskButton from '../components/DeleteTaskButton';
import EditTaskForm from '../components/EditTaskForm';
import { useQuery } from '@apollo/client';
import { GET_TASK } from '../queries/taskQueries';

export default function Task() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_TASK, {
        variables: { id }
    });

    if (loading) return <Spinner />;
    if (error) return <p>Yep...something is not right</p>;

    return (
    <>
    {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
            <Link to='/' className="btn btn-light btn-sm w-25 d-inline ms-auto">Back
            </Link>

            <h1>{data.task.name}</h1>
            <p>{data.task.description}</p>

            <h5 className='mt-3'>Task Status</h5>
            <p className='lead'>{data.task.status}</p>

            <PhaseInfo phase={data.task.phase} />

            <EditTaskForm task={data.task} />

            <DeleteTaskButton taskId = {data.task.id}/>
        </div>
    )}
    </>
  )
}
