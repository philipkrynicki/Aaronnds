import { useSelector, useDispatch  } from "react-redux";
import { xIconUrl, plusIconUrl } from '../constants/constants.js';
import { useEffect, useState } from 'react';
import DropWrapper from "./drop-wrapper.js";
import { getListsAsync, addListAsync, deleteListAsync, addCardAsync, editListAsync } from '../redux/listSlice.js';
import {  editCardAsync } from '../redux/cardsSlice.js';
import CardDrag from './card-drag';
import {Accessibility} from 'react-ionicons';


const ListsAll = (props) => {
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [showEditListInput, setShowEditListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [editListName, setEditListName] = useState("");
  const [addNewCard, setAddNewCard] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [currentListID, setCurrentListID] = useState('');

  const lists = useSelector(state => state.lists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListsAsync(props.boardId));
  }, [dispatch, props.boardId]);

  const addListClickHandler = () => {
    setShowNewListInput(true);
  }
  
  const addListInputButtonClickHandler = () => {
    if (newListName === "" ) {
      return alert("Please enter a name for your list.");
    }
    dispatch(addListAsync({id: props.boardId, nameObj: {name: newListName}}));
    setShowNewListInput(false);
    setNewListName("");
  }

  const addListInputChangeHandler = (e) => {
    setNewListName(e.target.value);
  }

  const cancelAddListHandler = () => {
    setShowNewListInput(false);
  }

  const editListNameClickHandler = (list) => {
    setCurrentListID(list._id);
    setShowEditListInput(true);
  }

  const deleteListClickHandler = (list) => {
    dispatch(deleteListAsync(list._id));
  }

  const newCardLink = (list) => {
    return (
      <div className="col new-card-link">
        <div className=" col add-card-text" id={list._id} onClick={() => handleNewCardToggle({list})}>+ Add card</div>
      </div>     
    )
  };
  
  const newCardForm = (list) => {
    return (      
      <div className="card-addView" id={list._id}>            
        <input type="text" className="form-control new-card-input-field" placeholder="New card title" onChange={(e) => setNewCardName(e.target.value)}></input>
        <button type="button" className="button btn btn-primary btn-sm new-card-btn" onClick={() => handleCardSubmit({list})}>Add card</button>  
        <img src={xIconUrl} alt="x" className="sm-x-icon" onClick={cancelNewCard} />      
      </div>     
    )
  }
  const cancelNewCard = () => {
    setAddNewCard(false);
  }

  const handleNewCardToggle = (list) => {
    setCurrentListID(list.list._id)
    setAddNewCard(true)
  };

  const handleCardSubmit = (list) => { 
    if (!newCardName) {
      return alert("Please enter a name for your card")
    }         
    dispatch(addCardAsync({listID: currentListID, nameObj: {name: newCardName}}));
    setNewCardName("");
    setAddNewCard(false);    
  }

  const handleEditListInputSubmit = (e, list) => {
    setEditListName(e.target.value)

    if (e.key === 'Enter' && e.target.value !== "") {
      dispatch(editListAsync({id: list._id , nameObj: {name: editListName}}))
      setShowEditListInput(false);
      setEditListName("");
    }

    if (e.key === 'Enter' && e.target.value === "") {
      setShowEditListInput(false);
      setEditListName("");
    }
  }

  const renderNewListButton = () => {
    if (showNewListInput === true) {
      return (
        <div className="col-md-3">
          <div className="col new-list-input-col-outer">
            <div className="col new-list-input-col-inner">
              <input type="text" className="form-control new-list-input-field" placeholder="New list title" onChange = {addListInputChangeHandler}></input>
              <button type="button" className="btn btn-primary btn-sm new-list-input-button" onClick={addListInputButtonClickHandler}>Add list</button>
              <img src={xIconUrl} alt="x" className="sm-x-icon" onClick={cancelAddListHandler} />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="col-md-3">
        <div className="col">
          <div className="col d-flex new-list-comp" onClick={addListClickHandler}>
            <img src={plusIconUrl} alt="add" className="sm-plus-icon" />
            <h5 className="add-listname-text">Add list</h5>
          </div>
        </div>
      </div>
    )
  }

  const renderListName = (list) => {
    if (showEditListInput === true && list._id === currentListID) {
      return (
        <div className="col col-listname-edit-input">
          <input type="text" className="listname-edit-inp" placeholder={list.name} onKeyUp={(e) => handleEditListInputSubmit(e, list)} />
        </div>
      )
    }
    return (
        <h5><strong>{list.name}</strong></h5>
    )
  }
 
  const renderLists = () => {
    if (lists.length === 0) {
      return (
      <div>
       {renderNewListButton()}
      </div>
    )
    } else {
      
      return (
        <div className ="container list-container">
          <div className="row entire-list-row flex-row flex-nowrap mt-4 pb-4 pt-2">
            {lists.map((list) => {
              return (
                <div className="col-md-3 single-list-col" key={list._id}>
                  <div className="col list-comp">
                    <div className="card bg-cust">
                    <div className="row">

                      <div className="col-10 col-listname">
                        {renderListName(list)}
                      </div>

                      <div className="col-2 text-center">
                        <div className="btn-group dropend">
                          <button type="button" className="btn-sm dropdown-toggle list-drop-btn" data-bs-toggle="dropdown" aria-expanded="false">
                      
                          </button>
                          <ul className="dropdown-menu">
                            <li><button className="dropdown-item" type="button" onClick={() => editListNameClickHandler(list)}>Edit list name</button></li>
                            <li><button className="dropdown-item" type="button" onClick={() => deleteListClickHandler(list)}>Delete list</button></li>
                          </ul>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">

                          {list.cards.map((card) => {
                              return(
                                <CardDrag key={card._id} id={card._id} name={card.name}/>
                              )
                            })}
                        

                          {addNewCard && list._id === currentListID ? newCardForm(list._id): newCardLink(list)}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              )})}
                {renderNewListButton()}
            </div>

          </div>
      )}}

  return (
    <div>
      {renderLists()}
    </div>
  );
}

export default ListsAll