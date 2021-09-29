import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getCardAsync} from '../redux/cardsSlice.js'

const CardDetail = (props) => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch();
  const card = useSelector(state => state.card);

  const handleModalClose = () => setShow(false)
 
  useEffect(() => {    
    dispatch(getCardAsync(props.id)) 
  }, [dispatch, props.id])

  //this does nothing. Likely has somethign to do with how many times the function is called for some reason. See console logs. 
  const showLabels = () => {
    console.log("show labels function")
    card.labels.map((label) => {     
      return (
        <div>{label}</div>   
        )
    })
  }
  
  const showActivity = () => {
    card.activities.map((action) => {
      return (
        <li>{action}</li>
      )
    })
  }

 //need to add list name to card information that comes from the server?
  return (
    <div>
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{card.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>labels: </strong>
          <div>
           {showLabels()}
          {/* {card.labels.map((label) => {
            return (
              <p>{label}</p> 
            )
          })} */}
          </div>
          <br/><br/>
          <u>Description:</u>
          {card.description}
          <br /> <br /> 
          <u>Activity:</u>
          <ul>
            {showActivity()}
          </ul>
          <hr></hr>
          <u>Comments:</u>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CardDetail