import BoardsAll from './boards-all.js';

const Homescreen = () => {
  
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="text-center">

            <h1 className="homescreen-title">
              <strong>YOUR WORKSPACE</strong>
            </h1>

            <BoardsAll />

            <br></br>
            <br></br>
            <br></br>
            <br></br>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Homescreen;