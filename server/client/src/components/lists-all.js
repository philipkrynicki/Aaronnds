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
                <h5><strong>{list.name}</strong></h5>
                <CardsAll />
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