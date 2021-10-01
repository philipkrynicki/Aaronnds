import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveCardAsync,  } from "../redux/listSlice"

function DropWrapper(props) {
  const dispatch = useDispatch();
  
  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      onDrop(item, listDrop)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver,
    }),
  }));

  const onDrop = (item, dest) => {  
    dispatch(moveCardAsync({list: item.list, id: item.id, destList: { destinationList: dest._owner.key}}))
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