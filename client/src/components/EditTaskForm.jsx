import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_TASK } from '../queries/taskQueries';
import { UPDATE_TASK } from '../mutations/taskMutations';


export default function EditTaskForm({ task }) {
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    

    const [updateTask] = useMutation(UPDATE_TASK, {
        variables: { id: task.id, name, description, status},
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_TASK, variables: { id: task.id} }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        //better than nothing??
        if((task.phase.number-1)>1){
            return alert('Make sure all tasks for previous phase are completed!')
        };
        
        updateTask(name, description, status);
    };

    return (
    <div className='mt-5'>
        <h3>Update Task Details</h3>
        <form onSubmit={ onSubmit }>
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
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}
