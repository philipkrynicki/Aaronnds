import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editCardAsync, getCardAsync } from '../redux/cardsSlice.js'
import Labels from "./labels"
import Activities from "./activities.js";
import { editIconUrl } from "../constants/constants.js";
import { useParams } from "react-router";

const CardDetail = (props) => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch();
  const card = useSelector(state => state.card);
  const [currentCardId, setCurrentCardId] = useState('');
  const [showEditCardNameInput, setShowEditCardNameInput] = useState(false);
  const [showEditCardDescriptionInput, setShowEditCardDescriptionInput] = useState(false);
  const [editCardName, setEditCardName] = useState("");
  const [editCardDescription, setEditCardDescription] = useState("");

  const handleModalClose = () => {
    setShow(false);
    props.onChange(false)
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
      console.log(card._id)
      console.log(editCardName)
      dispatch(editCardAsync({id: card._id,  name: editCardName}))
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
      console.log(card._id)
      console.log(editCardDescription)
      dispatch(editCardAsync({id: card._id,  description: editCardDescription}))
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
        <button class="description-edit mx-2" onClick={() => editCardDescriptionClickHandler(card)}>Edit</button>
      </p>
    )
  }

 //need to pass list name in props from parent to display here
  return (
    <div>
      <Modal className="card-detail-modal" show={show} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {/* <strong>{card.name}</strong> */}
            {renderCardName(card)}
          </Modal.Title>
          <div className="mx-2">
            <img src={editIconUrl} alt="edit" className="edit-icon" onClick={() => editCardNameClickHandler(card)} />
          </div>
        </Modal.Header>
        <Modal.Body>
        <div>
          <strong>labels: </strong>
           <Labels />
          
          </div>
          <br/>
          <u>Description:</u>  
          <p>
            {/* {card.description} */}
            {renderCardDescription(card)}
          </p>
          <br /> <br /> 
          <u>Activity:</u>
          <Activities />
          <hr></hr>
          <u>Comments:</u>
          <div>
            
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CardDetail