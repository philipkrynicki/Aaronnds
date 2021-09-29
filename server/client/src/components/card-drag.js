import { useDrag } from "react-dnd";
import CardDetail from "./card-detail.js"
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"

function CardDrag ({id, name}) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentCardID, setCurrentCardID] = useState('');

  // useEffect(() => {
  //   setShowDetail(false)
  // }, [])

  const cardDetailChange = (newValue) => {
    setShowDetail(newValue)
  }

  const [{isDragging}, drag] = useDrag(() => ({
    type: "card",
    item: {id: id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //Need to figure out a way to get the showDetail to reset to false. This allows the detail view to show if clicked twice, first to reset the showDetail state variable and second to launch the detail. 
  const viewCardDetail = (id) => {
    setShowDetail(!showDetail)
    setCurrentCardID(id);    
  }

  return (
    <div className="col">
      <div className="col card-listview" ref={drag} onClick={() => viewCardDetail(id)}>{name}</div>
      
      { showDetail && <CardDetail id={currentCardID} value={showDetail} onChange={cardDetailChange}/>}
    </div>
  ) 
}

export default CardDrag