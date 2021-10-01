import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveCardAsync } from "../redux/cardsSlice"

function DropWrapper(props) {
  const dispatch = useDispatch();
  
  const [{isOver}, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      onDrop(item, listDrop._owner.key)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver,
    }),
  }));
  
  const onDrop = (item, dest) => {
    console.log(item)
    console.log(dest)
    dispatch(moveCardAsync({list: item.list, id: item.id, destList: { destinationList: dest}}))
  }

  const listDrop = ( 
    <div className="col-md-3" ref={drop}>
      {props.children}
    </div>
  )
  return (
   listDrop
  )
}
export default DropWrapper