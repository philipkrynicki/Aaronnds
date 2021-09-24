const ListsAll = () => {

  return (

    
    <div className="row">

      <div className="col-md-3">
        <div className="col list-comp">
          <h5><strong>To Do List</strong></h5>
        </div>
      </div>

      <div className="col-md-3">
        <div className="col list-comp">
          <h5><strong>Doing List</strong></h5>
        </div>
      </div>

      <div className="col-md-3">
        <div className="col list-comp">
          <h5><strong>Done List</strong></h5>
        </div>
      </div>

      <div className="col-md-3">
        <div className="col new-list-comp">
          <h5><strong>+ Add list</strong></h5>
        </div>
      </div>

    </div>
  );
}

export default ListsAll