import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCardAsync } from '../redux/cardsSlice.js'
import Labels from "./labels"
import Activities from "./activities"

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

 //need to pass list name in props from parent to display here
  return (
    <div>
      <Modal className="card-detail-modal" show={show} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title><strong>{card.name}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>In list: <u>{props.list} </u> </p>
          <strong>labels: </strong>
           <Labels />
          
          </div>
          <br/>
          <u>Description:</u>  
          <p>{card.description}</p>
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