import { editIconUrl, deleteIconUrl } from '../constants/constants.js';
import { useSelector } from "react-redux";
import { useState } from 'react';

const ListsAll = () => {
  const lists = useSelector(state => state.lists); 
  const [addNewCard, setAddNewCard] = useState(false)
  const newCardLink = (list) => {
    return (
      <div className="new-card-link" id={list._id} onClick={handleNewCard}>+ Add Card</div>      
    )
  };
  
  const newCardForm = (list) => {
    return (      
      <div className="card-listview">        
        <input type="text" className="form-control" placeholder="Enter card title"></input>
        <button type="button" className="button btn btn-primary new-card-btn" onClick={handleCardSubmit}>Add Card</button>
      </div>     
    )
  }

  const handleNewCard = () => {
    setAddNewCard(true)

  };

  const handleCardSubmit = () => {
    
    setAddNewCard(false)
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
                      
                      {addNewCard ? newCardForm(list): newCardLink(list)}
                    
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