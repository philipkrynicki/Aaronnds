import { useDrag } from "react-dnd";
import CardDetail from "./card-detail.js"
import { useState } from "react";

function CardDrag ({id, name, listName, listId, position}) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentCardID, setCurrentCardID] = useState('');

  const cardDetailChange = (newValue) => {
    setShowDetail(newValue)
  }

  const [{isDragging}, drag] = useDrag(() => ({
    type: "card",
    item: {id: id, list: listId, position: position}, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
 
  const viewCardDetail = (id) => {
    setShowDetail(true);
    setCurrentCardID(id);    
  }

  return (
    <div className="col">
      { showDetail && <CardDetail id={ currentCardID } value={ showDetail } list={ listName } onChange={cardDetailChange}/>}
      {!isDragging ? <div className="col card-listview" ref={drag} onClick={() => viewCardDetail(id)}>{name}</div> : null}

    </div>
     ) 
}

export default CardDrag