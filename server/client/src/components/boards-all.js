import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { getBoardsAsync, addBoardAsync } from "../redux/boardsSlice";
import { Modal, Button } from "react-bootstrap";
import { getListsAsync } from '../redux/listSlice';
import { getBoardAsync } from '../redux/boardSlice';
import { getCardsAsync } from '../redux/cardsSlice';


const BoardsAll = () => {
  const [show, setShow] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);
  const boards = useSelector(state => state.boards);

  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  const handleModalAdd = () => {
    if (newBoardName === "") {
      return alert("Please enter a name for your board.")
    }
      setShow(false);
      console.log(newBoardName);
      dispatch(addBoardAsync({name: newBoardName}));
      setNewBoardName("");
  }

  const boardClickHandler = (id) => (event) => {
    dispatch(getBoardAsync(id));
    dispatch(getListsAsync(id));
    history.push(`/board/${id}`);
  };

  const newBoardInputChangeHandler = (e) => {
    setNewBoardName(e.target.value);
  }

  const renderBoards = () => {
    return (
      <div className="row">
        
        {boards.map((board) => {
          return (
            <div className="col-md-4 d-flex justify-content-center" key={board._id}>
              <div className="board-comp d-flex align-items-center justify-content-center" onClick={boardClickHandler(board._id)}>
                <h2>
                  {board.name}
                </h2>
              </div>
            </div>
          )
        })}
      
        <div className="col-md-4 d-flex justify-content-center">
          <div className="new-board-comp d-flex align-items-center justify-content-center" onClick={handleModalShow}>
              <h2>
                <strong>+ </strong>Add board
              </h2>
          </div>
        </div>
    
      </div>
    )
  };

  const renderNewBoardModal = () => {
    return (
      <div>
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton><Modal.Title>Name your new board:</Modal.Title></Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" placeholder="New board title" onChange={newBoardInputChangeHandler} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary text-center" onClick={handleModalAdd}>
              Add board
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  return (
      <div>
        {renderNewBoardModal()}
        {renderBoards()}
      </div>
  );
}

export default BoardsAll