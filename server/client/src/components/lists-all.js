import { editIconUrl, deleteIconUrl } from '../constants/constants.js';
import { useSelector } from "react-redux";
import { useState } from 'react';
import { addCardAsync } from '../redux/cardsSlice.js';

const ListsAll = () => {
  const lists = useSelector(state => state.lists); 
  const [addNewCard, setAddNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const newCardLink = (list) => {
    return (
      <div className="new-card-link" id={list._id} onClick={handleNewCardToggle}>+ Add Card</div>      
    )
  };
  
  const newCardForm = (list) => {
    return (      
      <div className="card-listview" id={list._id}>            
        <input type="text" className="form-control" placeholder="Enter card title" onChange={(e) => setNewCardTitle(e.target.value)}></input>
        <button type="button" className="button btn btn-primary btn-sm new-card-btn" onClick={handleCardSubmit}>Add Card</button>  
        <a className="cancel-card" href="#" onClick={cancelNewCard}>X</a>      
      </div>     
    )
  }
  const cancelNewCard = () => {
    setAddNewCard(false);
  }

  const handleNewCardToggle = () => {
    
    setAddNewCard(true)
  };

  const handleCardSubmit = (list) => { 
    if (newCardTitle === "") {
      return alert("Please enter a name for your card")
    } 

    setAddNewCard(false)
    dispatchEvent(addCardAsync({name: newCardTitle}))
  }

  const viewCardDetail = () => {
    //link to Card Detail component or delete function and include link in the jsx?
  }

  const renderLists = () => {
    return (
      <div className="row">
        {lists.map((list) => {
          return (
            <div className="col-md-3" key={list._id}>
              <div className="col list-comp">
                <div className="row">
                  <div className="col-8 col-listname">
                    <h5><strong>{list.name}</strong></h5>
                 </div>
                 <div className="col-4 text-end">
                  <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
                  <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
                </div>
                <div className="row">
                  <div className="col">
                    {list.cards.map((card) => {
                        return(
                          <div className="card-listview " key={card._id} onClick={viewCardDetail(card._id)}>{card.name}</div>
                        )
                      })}
                      
                      {addNewCard ? newCardForm(list._id): newCardLink(list)}
                    
                  </div>
                </div>
               </div>
              </div>
            </div>
          )
        })}
        <div className="col-md-3">
          <div className="col new-list-comp">
            <h5><strong>+ Add list</strong></h5>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderLists()}
    </div>
  );
}

export default ListsAll