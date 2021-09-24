import ListsAll from './lists-all.js';
import { editIconUrl, deleteIconUrl } from '../constants/constants.js';

const BoardIndividual = () => {

  return (
    <div>
      <div className="row">
        <div className="col">

          <div className="row">
            <div className="col-md-4">

            </div>
            <div className="col-md-4">
              <h2 className="board-ind-title text-center">
                <strong>EXAMPLE BOARD A</strong>
              </h2>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-contents-start board-ind-title-icons-col">
              <img src={editIconUrl} alt="edit" className="edit-icon" />
              <img src={deleteIconUrl} alt="delete" className="delete-icon" />
            </div> 

          </div>
          
          <ListsAll />
        </div>

      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default BoardIndividual;