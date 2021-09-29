import { useDrag } from "react-dnd";

function CardDrag ({id, name}) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "card",
    item: {id: id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const viewCardDetail = () => {
    //link to Card Detail component or delete function and include link in the jsx?
  }

  return (
    <div className="card-listview " ref={drag} onClick={viewCardDetail(id)}>{name}</div>
  ) 
}

export default CardDrag