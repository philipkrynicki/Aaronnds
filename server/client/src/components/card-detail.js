import { Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCardAsync } from '../redux/cardsSlice.js'
import Labels from "./labels"
import Activities from "./activities"
import Comments from "./comments"

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
              <strong>{card.name}</strong>
              <h6 className="in-list-text">in list: <u><strong>{props.list}</strong></u></h6>
            </div>    
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container">
            <div className="row">
              <p>In list: <u>{props.list} </u> </p>
              <div className="col-11 first-card-detail-col">
                <div>
                  <h6><strong>labels:</strong></h6>
                  <Labels />  
                </div>
                <br/>
                <br/>
                <div>
                  <u><strong>Description:</strong></u>  
                  <p>{card.description}</p>
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
                </div>
              </div>

              <div className="col-1 second-card-detail-col text-end d-flex align-items-end">
                <div className="col">
                  <div className="row">
                    <div className="col">

                      <div className="btn-group dropend">
                        <button type="button" className="btn btn-success card-detail-btn btn-sm dropdown-toggle" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Labels</button>
                        
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