import { useSelector } from "react-redux";

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
              </div>
            </div>
          )
        })}
        
      </div>
    )
  }
  return (
    <>
      {renderLists()}
    </>
  );
}

export default ListsAll