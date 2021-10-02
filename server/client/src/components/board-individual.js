import { useSelector, useDispatch } from 'react-redux';
import ListsAll from './lists-all.js';
import {CreateOutline, TrashOutline} from 'react-ionicons';
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { editBoardAsync, getBoardAsync } from "../redux/boardSlice";
import { deleteBoardAsync } from '../redux/boardsSlice.js';
import { getListsAsync } from '../redux/listSlice.js';
import { useHistory } from 'react-router';
import socket from '../socket-connect.js';

const BoardIndividual = (props) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [updatedBoardName, setUpdatedBoardName] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleModalShow = () => setShow(true);
  const handleModalClose = () => setShow(false);
  const handleModalDeleteShow = () => setShowDelete(true);
  const handleModalDeleteClose = () => setShowDelete(false);
  
  const newBoardInputChangeHandler = (e) => {
    
    setUpdatedBoardName(e.target.value)
  }
  const board = useSelector(state => state.board);
  const user = useSelector(state => state.user);

  socket.on('deleteBoard', id => {
    if (board._id === id) {
      history.push('/');
    }
  })

  const handleModalEdit = (e) => {
    if (updatedBoardName === "") {
      return (alert("Please enter a name for the board."))
    }
    e.preventDefault();
    setShow(false);
    dispatch(editBoardAsync({id: board._id, nameObj: {name: updatedBoardName}}));
    setUpdatedBoardName("");
  }


  const handleModalDelete = () => {
    setShow(false);
    dispatch(deleteBoardAsync({id: board._id}));
  }

  useEffect(() => {
    dispatch(getBoardAsync(props.match.params.id));
    }, [dispatch, props.match.params.id]);

  useEffect(() => {
    dispatch(getListsAsync(props.match.params.id));
    }, [dispatch, props.match.params.id]);

  const renderBoardDetail = (board) => {
    return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <h2 className="board-ind-title text-center">
          <strong>{board.name}</strong>
        </h2>
      </div>

      {user.authenticated && <div className="col-md-4 d-flex align-items-center justify-contents-start board-ind-title-icons-col">

        <CreateOutline height="30px" width="30px" className="board-edit-icon" onClick={handleModalShow} />
        <TrashOutline height="30px" width="30px" className="board-delete-icon" onClick={handleModalDeleteShow} />

      </div>} 
    </div> 
    )
  }

  const renderEditBoardModal = (board) => {
    return (
      <div>
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton><Modal.Title>Edit board name:</Modal.Title></Modal.Header>
          <Modal.Body>
            <form onSubmit={handleModalEdit}>
              <input type="text" className="form-control" defaultValue={board.name} onChange={newBoardInputChangeHandler} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary text-center" onClick={handleModalEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  const renderDeleteBoardModal = () => {
    return (
      <div>
        <Modal show={showDelete} onHide={handleModalDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Are you sure you want to delete this board?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="danger text-center" onClick={handleModalDelete}>
              Delete
            </Button>
            <Button variant="secondary text-center" onClick={handleModalDeleteClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col align-items-center">
          {renderBoardDetail(board)}   
          {renderEditBoardModal(board)}   
          {renderDeleteBoardModal()}
          <ListsAll boardId={board._id} />
        </div>

      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default BoardIndividual;