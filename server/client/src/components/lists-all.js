import { useSelector, useDispatch  } from "react-redux";
import { xIconUrl, tripleDotIconUrl, plusIconUrl } from '../constants/constants.js';
import { useEffect, useState } from 'react';
import { getListsAsync, addListAsync } from '../redux/listSlice.js';

const ListsAll = (props) => {
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState ("");

  const lists = useSelector(state => state.lists)

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

  const listDotClickHandler = () => {
    console.log('Display edit/remove list modal')
  }

  const handleNewCard = () => {
    
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
            <h5 className="add-listname-text"><strong>Add list</strong></h5>
          </div>
        </div>
      </div>
    )
  }
 

  const renderLists = () => {
    if (lists.length === 0) {
      return (
      <div className="col-md-3">
        <div className="col new-list-comp">
          <h5><strong>+ Add list</strong></h5>
        </div>
      </div>
    )
    } else {
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
                    <img src={tripleDotIconUrl} alt="edit" className="sm-3dot-icon" onClick={listDotClickHandler} />
                   </div>
                <div className="row">
                  <div className="col">
                    {list.cards.map((card) => {
                        return(
                          <div className="card-listview " key={card._id}>{card.name}</div>
                        )
                      })}
                    <div className="new-card-link" onClick={handleNewCard()}>+ Add Card</div>
                  </div>
                 </div>
                </div>
              </div>
            </div>
            )})}
              {renderNewListButton()}
          </div>
      )}}

  return (
    <div>
      {renderLists()}
    </div>
  );
}

export default ListsAll