import React from "react";
import { useDrop } from "react-dnd";

function DropWrapper() {
  const [{isOver}, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => console.log('drop!'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      
    </div>
  )
}
export default DropWrapper