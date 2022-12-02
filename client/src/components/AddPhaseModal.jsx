import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PHASE } from '../mutations/phaseMutations';
import { GET_PHASES } from '../queries/phaseQueries';

export default function AddPhaseModal() {
    const [number, setNumber] = useState ('');
    const [description, setDescription] = useState ('');

    const [addPhase] = useMutation(ADD_PHASE, {
        variables: { number, description },
        update(cache, { data: { addPhase } }){
            const { phases } = cache.readQuery({
                query: GET_PHASES
            });
            cache.writeQuery({
                query: GET_PHASES,
                data: { phases: [...phases, addPhase] },
            });
        }
    });
  
    const onSubmit = (e) => {
        e.preventDefault();

        //make sure we are getting all info
        if(number===''|| description===''){
            return alert('Please fill in the missing field')
        }
        //clear form after submit
        addPhase(number, description);

        setNumber('');
        setDescription('');
    }

  return (
    <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addPhaseModal">
            <div className='d-flex align-items-center'>
                <div>Add Phase</div>
            </div>
        </button>

        <div className="modal fade" id="addPhaseModal" aria-labelledby="addPhaseModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addPhaseModalLabel">Add Phase</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className='form-label'>Number</label>
                                <input type='text' className='form-control' id='number' value={number} onChange={ (e) => setNumber(e.target.value) }/>
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Description</label>
                                <textarea className='form-control' id='description' value={description} onChange={ (e) => setDescription(e.target.value) }></textarea>
                            </div>
                            <button type='submit' data-bs-dismiss='modal' className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
