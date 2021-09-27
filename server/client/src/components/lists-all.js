
import { editIconUrl, deleteIconUrl } from '../constants/constants.js';
import { useDispatch, useSelector } from "react-redux";
import CardsAll from "./cards-all";
import { useEffect } from 'react';
import { getListsAsync } from '../redux/listSlice.js';


const ListsAll = (props) => {
  const lists = useSelector(state => state.lists)

 


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
                    <CardsAll />
                 </div>
                 <div className="col-4 text-end">
                  <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
                  <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
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