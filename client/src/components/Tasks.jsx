import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../queries/taskQueries";
import TaskCard from "./TaskCard";

export default function Tasks() {
   const { loading, error, data } = useQuery(GET_TASKS)

    if (loading) return <Spinner />;
    if (error) return <p>I don't think this is right</p>;

    return (
        <>
            { data.tasks.length > 0 ? (
                <div className='row mt-3'>
                    {data.tasks.map((task)=>
                        <TaskCard key={task.id} task={task}/>
                    )}
                </div>
            ) : (<p>No Tasks</p>) }
        </>
    )
}
