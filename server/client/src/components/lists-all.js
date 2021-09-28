
import { editIconUrl, deleteIconUrl } from '../constants/constants.js';
import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from 'react';
import { getListsAsync } from '../redux/listSlice';
import { getBoardAsync } from '../redux/boardSlice';

const ListsAll = () => {
  const lists = useSelector(state => state.lists);
  const dispatch = useDispatch();
  // let id = props.match.params

  // useEffect(() => {
  //   dispatch(getBoardAsync(id));
  //   dispatch(getListsAsync(id));
  // }, [dispatch]);
  

  const handleNewCard = () => {
    
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
                    <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
                    <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
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
    }
   

  return (
    <div>
      {renderLists()}
    </div>
  );
}

export default ListsAll