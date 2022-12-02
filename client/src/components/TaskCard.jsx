export default function TaskCard({task}) {
  return (
    <div className="col-md-6">
        <div className="card mb-3">
            <div className="card-body">
                <div className= "d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{ task.name }</h5>
                    <a className="btn btn-light" href={`/tasks/${task.id}`}>View</a>
                </div>
                <p className="small">Status: <strong>{task.status}</strong></p>
            </div>
        </div>
    </div>
  )
}
