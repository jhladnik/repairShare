import {FaIdBadge} from 'react-icons/fa';

export default function PhaseInfo({ phase }) {
  return (
    <>
        <h5 className='mt-5'>Phase Information</h5>
        <ul className='list-group'>
            <li className='list-group-item'>
                <FaIdBadge className='icon'/> {phase.number}
            </li>
            <li className='list-group-item'>
                {phase.description}
            </li>
        </ul>
    </>
  )
}
