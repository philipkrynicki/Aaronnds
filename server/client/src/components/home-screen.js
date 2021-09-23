import BoardsAll from './boards-all.js';

const Homescreen = () => {
  
  return (
    <div className="row">
      <div className="col">
        <div className="text-center">

          <h2 className="text-primary">
            [~~~~~ HOMESCREEN ~~~~~]
            </h2>

            <BoardsAll />

        </div>
      </div>
    </div>
  );
}

export default Homescreen;