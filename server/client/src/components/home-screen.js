import BoardsAll from './boards-all.js';
import { editIconUrl } from '../constants/constants.js';

const Homescreen = () => {
  
  return (
    <div>

      <div className="col-md-8 offset-2">
        <div className="text-center">
          <h1 className="homescreen-title">
            <strong>YOUR WORKSPACE</strong>
          </h1>
        </div>
      </div>


      <div className="row">
            <BoardsAll />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default Homescreen;