
import { editIconUrl, deleteIconUrl } from '../constants/constants.js';
import { useSelector } from "react-redux";
import CardsAll from "./cards-all";

const ListsAll = () => {
  const lists = useSelector(state => state.lists)

  const renderLists = () => {
    return (
      <div className="row">
        {lists.map((list) => {
          return (
            <div className="col-md-3" key={list._id}>
              <div className="col list-comp">
                <div className="row">
                  <div className="col">
                    <h5><strong>{list.name}</strong></h5>
                    <CardsAll />
                 </div>
                 <div className="col text-end">
                  <img src={editIconUrl} alt="edit" className="sm-edit-icon" />
                  <img src={deleteIconUrl} alt="delete" className="sm-delete-icon" />
                </div>
               </div>
              </div>
            </div>
          )
        })}
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