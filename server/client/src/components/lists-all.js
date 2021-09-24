import { editIconUrl, deleteIconUrl } from '../constants/constants.js';

const ListsAll = () => {

  return (

    
    <div className="row">

      <div className="col-md-3">
        <div className="col list-comp">
          <div className="row">
            <div className="col">
              <h5><strong>To Do List</strong></h5>
            </div>
            <div className="col text-end">
              <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
              <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="col list-comp">
          <div className="row">
            <div className="col">
              <h5><strong>Doing List</strong></h5>
            </div>
            <div className="col text-end">
              <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
              <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="col list-comp">
          <div className="row">
            <div className="col">
              <h5><strong>Done List</strong></h5>
            </div>
            <div className="col text-end">
              <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
              <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
            </div>
          </div>
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