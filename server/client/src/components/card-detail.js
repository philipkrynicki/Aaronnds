import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getListsAsync, moveCardAsync } from '../redux/listSlice.js'
import { getCardAsync, editCardAsync } from '../redux/cardsSlice.js'
import { deleteCardAsync } from "../redux/listSlice.js";
import Labels from "./labels"
import Activities from "./activities"
import Comments from "./comments"
import { CreateOutline, Create } from "react-ionicons"
import socket from '../socket-connect.js';

const CardDetail = (props) => {
  const [show, setShow] = useState(true)

  const dispatch = useDispatch();
  const card = useSelector(state => state.card);
  const board = useSelector(state => state.board);
  const lists = useSelector(state => state.lists);
  const user = useSelector(state => state.user);

  const [currentCardId, setCurrentCardId] = useState('');

  const [selectedListToMove, setSelectedListToMove] = useState('');

  const [showEditCardNameInput, setShowEditCardNameInput] = useState(false);
  const [showEditCardDescriptionInput, setShowEditCardDescriptionInput] = useState(false);
  const [editCardName, setEditCardName] = useState("");
  const [editCardDescription, setEditCardDescription] = useState("");

  const handleModalClose = () => {
    setShow(false);
    props.onChange(false)
    dispatch(getListsAsync(board._id))
  }

  useEffect(() => {    
    dispatch(getCardAsync(props.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  ,[dispatch, props.id]
  )

  socket.on('deleteCard', () => {
    handleModalClose();
  })

  const editCardNameClickHandler = (card) => {
    if (showEditCardNameInput)
    {
      return setShowEditCardNameInput(false);
    }
    setCurrentCardId(card._id);
    setShowEditCardNameInput(true);
  }

  const editCardDescriptionClickHandler = (card) => {
    if(showEditCardDescriptionInput) {
      return setShowEditCardDescriptionInput(false);
    }

    setCurrentCardId(card._id);
    setShowEditCardDescriptionInput(true)
  }

  const handleEditCardNameInputSubmit = (e, card) => {
    setEditCardName(e.target.value)
    if (e.key === 'Enter' && e.target.value !== "") {
      dispatch(editCardAsync({_id: card._id,  name: {name: editCardName}}));
      setShowEditCardNameInput(false);
    }

    if (e.key === 'Enter' && e.target.value === "") {
      setShowEditCardNameInput(false);
      setEditCardName("")
    }
  }

  const handleEditCardDescriptionInputSubmit = (e, card) => {
    setEditCardDescription(e.target.value)

    if (e.key === 'Enter' && e.target.value !== "") {
      dispatch(editCardAsync({_id: card._id,  description:{description: editCardDescription}}))
      setShowEditCardDescriptionInput(false);
    }

    if (e.key === 'Enter' && e.target.value === "") {
      setShowEditCardDescriptionInput(false);
      setEditCardDescription("")
    }
  }

  const renderCardName = (card) => {
    if (showEditCardNameInput === true && card._id === currentCardId) {
      return (
          <input type="text" className="cardname-edit-inp" defaultValue={card.name} onKeyUp={(e) => handleEditCardNameInputSubmit(e, card)} />
      )
    }
    return (
      <strong>{card.name}</strong>
    )
  }

  const renderCardDescription = (card) => {
    if (showEditCardDescriptionInput === true && card._id === currentCardId) {
      return (
        <div>
          <textarea type="text" rows="4" cols="100" className="carddescription-edit-inp" defaultValue={card.description} onKeyUp={(e) => handleEditCardDescriptionInputSubmit(e, card)} />
        </div>
      )
    }

    if (card.description === null || card.description === "") { 
      return (
        <p className="card-desc-paragraph"><em>Add a more detailed description...</em></p>
      )
    }
    
    return (
      <p className="card-desc-paragraph">{card.description}</p>
    )
  }

  const moveListSubmitHandler = () => {
    if (selectedListToMove !== "") {
      //eslint-disable-next-line
      const isConfirmed = confirm(`Move this card to ${selectedListToMove.name}?`);
      if (isConfirmed === true) {
        dispatch(moveCardAsync({list: card.list, id:card._id, destList: {destinationList: selectedListToMove._id}}));
        setSelectedListToMove("");
    }
  }
}

  const cardDeleteClickHandler = (id) => {
    //eslint-disable-next-line
    const isConfirmed = confirm("This will delete the card. Continue?");
    if (isConfirmed === true) {
      dispatch(deleteCardAsync(id));
      setShow(false);
      dispatch(getListsAsync(board._id));
    }
  }

  const renderLabelsDropdown = () => {
    return (
      <div className="btn-group dropend">
        {user.authenticated && <button type="button" className="btn btn-success card-detail-btn btn-sm dropdown-toggle" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Labels</button>}
        
        <div className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
          <div className="labels-dropdown-options">


            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="red" id="flexCheckLabel1"></input>
              <label className="form-check-label" htmlFor="flexCheckLabel1">
                Label 1
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="blue" id="flexCheckLabel2"></input>
              <label className="form-check-label" htmlFor="flexCheckLabel2">
                Label 2
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="green" id="flexCheckLabel3"></input>
              <label className="form-check-label" htmlFor="flexCheckLabel3">
                Label 3...
              </label>
            </div>

          </div>
        </div>
      </div>
    )
  }

  const renderMoveDropdown = () => {
    const filteredList = lists.filter((list) => list._id !== card.list);

    if (filteredList.length !== 0 && user.authenticated) {
      return (
        <div className="btn-group dropend">
          <button className="btn btn-primary card-detail-btn btn-sm dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Move</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
              <div className="move-dropdown-options">

                <p className="text-center"><u><strong>Move card to List:</strong></u></p>

                {filteredList.map(list => {
                  return (
                    <div className="form-check" key={list._id}>
                      <input className="form-check-input" type="radio" name="flexRadioLists" id={list._id} onChange={() => setSelectedListToMove(list)}></input>
                      <label className="form-check-label" htmlFor={list._id}>
                        {list.name}
                      </label>
                    </div>
                  )
                })}
                <button type="button" className="btn-sm btn-primary move-dropdown-save-btn" onClick={() => moveListSubmitHandler()}>Move</button>

              </div>
            </div>
          </div>
      )
    }
  }

 //need to pass list name in props from parent to display here
  return (
    <div>
      <Modal className="card-detail-modal" show={show} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div> 
              {user.authenticated && <CreateOutline className="edit-cardname-icon" width="25px" height="25px" onClick={() => editCardNameClickHandler(card)} />}
              {renderCardName(card)}
              <h6 className="in-list-text">in list: <u><strong>{props.list}</strong></u></h6>
            </div>    
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container">
            <div className="row">
              <div className="col-11 first-card-detail-col">
                <div>
                  <h6><strong>labels:</strong></h6>
                  <Labels />  
                </div>
                <br/>
                <div>
                  {user.authenticated && 
                  <Create className="card-desc-edit-icon" onClick={() => editCardDescriptionClickHandler(card)}/>}
                  <u><strong>Description:</strong></u>
                  {renderCardDescription(card)}
                </div>
                <br/> 
                <div>
                  <u><strong>Activity:</strong></u>
                  <Activities />
                </div>
                <br/>
                <div>
                  <u><strong>Comments:</strong></u>
                  <Comments/>
                </div>
              </div>

              <div className="col-1 second-card-detail-col text-end d-flex align-items-top">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      {renderLabelsDropdown()}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      {renderMoveDropdown()}
                      </div>
                    </div>

                  {user.authenticated && <div className="row">
                    <div className="col">
                      <button type="button" className="btn btn-danger card-detail-btn btn-sm" onClick={() => cardDeleteClickHandler(card._id)}>Delete</button>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>



        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CardDetail