import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editCardAsync, getCardAsync } from '../redux/cardsSlice.js'
import Labels from "./labels"
import LabelMenu from "./label-menu.js";

import { editIconUrl } from "../constants/constants.js";
import { useParams } from "react-router";

import { getListsAsync } from "../redux/listSlice.js";
import Activities from "./activities"
import Comments from "./comments"

const CardDetail = (props) => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch();
  const card = useSelector(state => state.card);
  const board = useSelector(state => state.board);
  const [currentCardId, setCurrentCardId] = useState('');
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

  const editCardNameClickHandler = (card) => {
    setCurrentCardId(card._id);
    setShowEditCardNameInput(true);
  }

  const editCardDescriptionClickHandler = (card) => {
    setCurrentCardId(card._id);
    setShowEditCardDescriptionInput(true)
  }

  const handleEditCardNameInputSubmit = (e, card) => {
    setEditCardName(e.target.value)

    if (e.key === 'Enter' && e.target.value !== "") {
      dispatch(editCardAsync({id: card._id,  name: {name: editCardName}}));
      setShowEditCardNameInput(false);
      setEditCardName("")
    }

    if (e.key === 'Enter' && e.target.value === "") {
      setShowEditCardNameInput(false);
      setEditCardName("")
    }
  }

  const handleEditCardDescriptionInputSubmit = (e, card) => {
    setEditCardDescription(e.target.value)

    if (e.key === 'Enter' && e.target.value !== "") {
      dispatch(editCardAsync({id: card._id,  description:{description: editCardDescription}}))
      setShowEditCardDescriptionInput(false);
      setEditCardDescription("")
    }

    if (e.key === 'Enter' && e.target.value === "") {
      setShowEditCardDescriptionInput(false);
      setEditCardDescription("")
    }
  }

  const renderCardName = (card) => {
    if (showEditCardNameInput === true && card._id === currentCardId) {
      return (
        <div>
          <input type="text" className="cardname-edit-inp" placeholder={card.name} onKeyUp={(e) => handleEditCardNameInputSubmit(e, card)} />
        </div>
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
          <textarea type="text" rows="4" cols="100" className="carddescription-edit-inp" placeholder={card.description} onKeyUp={(e) => handleEditCardDescriptionInputSubmit(e, card)} />
        </div>
      )
    }
    return (
      <p>
        {card.description}
        <button className="description-edit mx-2" onClick={() => editCardDescriptionClickHandler(card)}>(Edit Description)</button>
      </p>
    )
  }

  const cardMoveClickHandler = () => {
    console.log('Moving card!');
  }

  const cardDeleteClickHandler = () => {
    console.log('Deleting card!')
  }

 //need to pass list name in props from parent to display here
  return (
    <div>
      <Modal className="card-detail-modal" show={show} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              {renderCardName(card)}
                <img src={editIconUrl} alt="edit" className="edit-icon mx-1" onClick={() => editCardNameClickHandler(card)} />
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
                <br/>
                <div>
                  <u><strong>Description:</strong></u>  
                  {renderCardDescription(card)}
                </div>
                <br/>
                <br/> 
                <div>
                  <u><strong>Activity:</strong></u>
                  <Activities />
                </div>
                <br/>
                <br/>
                <div>
                  <u><strong>Comments:</strong></u>
                  <Comments/>
                </div>
              </div>
              <div className="col-1 second-card-detail-col text-end d-flex align-items-end">
                <div className="col">
                  <div className="row">
                    <div className="col">

                      <LabelMenu />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">

                      <div className="btn-group dropend">
                          <button className="btn btn-primary card-detail-btn btn-sm dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Move</button>

                          <div className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
                            <div className="move-dropdown-options">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioLists" id="flexRadioList2"></input>
                                <label className="form-check-label" htmlFor="flexRadioList2" defaultChecked>
                                  List 2
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioLists" id="flexRadioList3"></input>
                                <label className="form-check-label" htmlFor="flexRadioList3">
                                  List 3
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioLists" id="flexRadioList4"></input>
                                <label className="form-check-label" htmlFor="flexRadioList4">
                                  List 4...
                                </label>
                              </div>

                              <button type="button" className="btn-sm btn-primary move-dropdown-save-btn" onClick={cardMoveClickHandler}>Move</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  <div className="row">
                    <div className="col">
                      <button type="button" className="btn btn-danger card-detail-btn btn-sm" onClick={cardDeleteClickHandler}>Delete</button>
                    </div>
                  </div>
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