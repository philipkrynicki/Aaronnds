import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveCardAsync, reorderCardAsync } from "../redux/listSlice"

function DropWrapper(props) {
  const dispatch = useDispatch();

  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      const dropZoneId = listDrop.props.children.props.listId
      if(item.list === dropZoneId) {
        onSameListDrop(item, listDrop.props.children.props.position)
      } else{
        if(listDrop.props.children.props.listId){
          onCardDrop(item, listDrop.props.children.props.listId)
        } else {
          onListDrop(item, listDrop)
        }
      }      
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver,
    }),
  }));

  const onSameListDrop = (item, newPosition) => {
    dispatch(reorderCardAsync({id: item.id, newPosObj : { newPosition: newPosition }}))
  }

  const onCardDrop = (item, dest) => { 
    dispatch(moveCardAsync({list: item.list, id: item.id, destList: { destinationList: dest}}))
  }

  const onListDrop = (item, dest) => {
    const destList = dest.props.children.props.className  
    dispatch(moveCardAsync({list: item.list, id: item.id, destList: { destinationList: destList}}))
  }

  const listDrop = ( 
    <div className="drop" ref={drop}>
      {props.children}
    </div>
  )
  return (
   listDrop
  )
}
export default DropWrapper