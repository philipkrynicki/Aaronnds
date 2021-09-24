import { useSelector } from 'react-redux';
import ListsAll from './lists-all.js';

const BoardIndividual = () => {
  const board = useSelector(state => state.board)


  const renderBoardDetail = (board) => {
    return (
      <h2 className="board-ind-title text-center">
            <strong>{board.name}</strong>
          </h2>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col">
      
          {renderBoardDetail(board)}

          <ListsAll />

          <br></br>
          <br></br>
          <br></br>
          <br></br>
            
        </div>
      </div>
    </div>
  );
}

export default BoardIndividual;