import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getCardAsync} from '../redux/cardsSlice.js'

const CardDetail = (props) => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch();
  const card = useSelector(state => state.card);

  const handleModalClose = () => {
    setShow(false);
    props.onChange(false)
  }
  useEffect(() => {    
    dispatch(getCardAsync(props.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //this does nothing. Likely has somethign to do with how many times the function is called for some reason. See console logs. 
  const showLabels = () => {
    console.log("show labels function")
    card.labels.map((label) => {
      switch (label) {
        case "yellow":
          return (
            <div className="label yellow"></div>
          )
        case "blue":
          return (
            <div className="label blue"></div>
          )
        case "black":
          return (
            <div className="label black"></div>
          )
        case "green":
          return (
            <div className="label green"></div>
          )
        case "red":
          return (
            <div className="label red"></div>
          )
        case "purple":
          return (
            <div className="label purple"></div>
          )
        default:
          return null
      }
    })
  }
  
  const showActivity = () => {
    card.activities.map((action) => {
      return (
        <li>{action}</li>
      )
    })
  }

  const showComments = () => {

  }

 //need to add list name to card information that comes from the server?
  return (
    <div>
      <Modal className="card-detail-modal" show={show} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title><strong>{card.name}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          <strong>labels: </strong>
           {showLabels()}
          {/* {card.labels.map((label) => {
            switch (label) {
              case "yellow":
                return (
                  <div className="label yellow" key={label}></div>
                )
              case "blue":
                return (
                  <div className="label blue" key={label}></div>
                )
              case "black":
                return (
                  <div className="label black" key={label}></div>
                )
              case "green":
                return (
                  <div className="label green" key={label}></div>
                )
              case "red":
                return (
                  <div className="label red" key={label}></div>
                )
              case "purple":
                return (
                  <div className="label purple" key={label}></div>
                )
              default:
                return null
            }
          })} */}
          </div>
          <br/>
          <u>Description:</u>  
          <p>{card.description}</p>
          <br /> <br /> 
          <u>Activity:</u>
          <ul>
            {showActivity()}
          </ul>
          <hr></hr>
          <u>Comments:</u>
          <div>
            {showComments()}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CardDetail