import Phases from "../components/Phases";
import Tasks from "../components/Tasks";
import AddPhaseModal from "../components/AddPhaseModal";
import AddTaskModal from "../components/AddTaskModal";

export default function Home() {
  return (
    <>
        <div className='d-flex gap-3 mb-4'>
            <AddPhaseModal />
            <AddTaskModal />
        </div>
              <Phases />
              <hr/>
              <Tasks />
    </>
  )
}
