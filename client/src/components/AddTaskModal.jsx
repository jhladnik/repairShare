import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TASK } from '../mutations/taskMutations';
import { GET_TASKS } from '../queries/taskQueries';
import { GET_PHASES } from '../queries/phaseQueries';


export default function AddPhaseModal() {
    const [name, setName] = useState ('');
    const [description, setDescription] = useState ('');
    const [phaseId, setPhaseId] = useState ('');
    const [status, setStatus] = useState ('new');

    const [addTask] = useMutation(ADD_TASK, {
        variables: { name, description, phaseId, status},
        update(cache, { data: { addTask } }) {
            const { tasks } = cache.readQuery({query: GET_TASKS });
            cache.writeQuery({
                query: GET_TASKS,
                data: {tasks: [...tasks, addTask] },
            });
        }
    });

    //get phases for select
    const {loading, error, data} = useQuery(GET_PHASES);
  
    const onSubmit = (e) => {
        e.preventDefault();

        //make sure we are getting all info
        if(name===''|| description==='' || status===''){
            return alert('Please fill in the missing field');
        }
        // //clear form after submit
        addTask(name, description, phaseId, status);

        setName('');
        setDescription('');
        setStatus('new');
        setPhaseId('');
    };

    if (loading) return null;
    if (error) return 'Contact engineering, someone messed up'

  return (
    <>
        { !loading && !error && (
            <>
                 <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModel">
                    <div className='d-flex align-items-center'>
                        <div>New Task</div>
                    </div>
                </button>

                <div className="modal fade" id="addTaskModel" aria-labelledby="addTaskModelLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="addTaskModelLabel">New Task</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className='form-label'>Name</label>
                                        <input type='text' className='form-control' id='name' value={name} onChange={ (e) => setName(e.target.value) }/>
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Description</label>
                                        <textarea  className='form-control' id='description' value={description} onChange={ (e) => setDescription(e.target.value) }></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Status</label>
                                        <select id='status' className='form-select' value={status} onChange={ (e) => setStatus(e.target.value)}>
                                            <option value='new'>Not Completed</option>
                                            <option value='completed'>Completed</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Phase</label>
                                        <select id="phaseId" className='form-select' value={phaseId} onChange={(e) => setPhaseId(e.target.value)}>
                                            <option value="">Select Phase</option>
                                            { data.phases.map((phase) => (
                                                <option key={phase.id} value={phase.id}>
                                                    {phase.number}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type='submit' data-bs-dismiss='modal' className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  )
}
